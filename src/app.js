import './styles/site.css';
import { jsPDF } from 'jspdf';
import { bibleVerses } from './verses.js';

const url = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const key = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const configured = Boolean(url && key);

const roles = [
  ['opening', 'Opening prayer'],
  ['preacher', 'Preacher'],
  ['praise', 'Praise singer'],
  ['worship', 'Worship singer'],
  ['coordinator', 'Coordinator'],
  ['closing', 'Closing prayer']
];

const state = {
  members: [],
  items: [],
  schedules: [],
  songs: [],
  devotions: [],
  images: [],
  admin: false,
  session: null
};

const $ = id => document.getElementById(id);

const esc = value =>
  String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[character]));

function today() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Nairobi',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map(part => [part.type, part.value])
  );

  return `${values.year}-${values.month}-${values.day}`;
}

function stamp() {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Nairobi',
    dateStyle: 'full'
  }).format(new Date());
}

function saturday() {
  const date = new Date(`${today()}T12:00:00Z`);

  date.setUTCDate(
    date.getUTCDate() + (6 - date.getUTCDay() + 7) % 7
  );

  return date.toISOString().slice(0, 10);
}

function verseForDay() {
  const date = today();
  const year = Number(date.slice(0, 4));

  const day = Math.floor(
    (Date.parse(`${date}T00:00:00Z`) - Date.UTC(year, 0, 1)) /
    86400000
  );

  return bibleVerses[day % bibleVerses.length];
}

function current() {
  return (
    state.schedules.find(schedule =>
      schedule.meeting_date === saturday()
    ) ||
    [...state.schedules]
      .filter(schedule => schedule.meeting_date >= today())
      .sort((a, b) => a.meeting_date.localeCompare(b.meeting_date))[0]
  );
}

let noticeTimer;

function show(message, error = false) {
  const notice = $('notice');

  clearTimeout(noticeTimer);

  notice.textContent = message;
  notice.classList.toggle('error', error);
  notice.hidden = false;

  noticeTimer = setTimeout(() => {
    notice.hidden = true;
  }, 6500);
}

async function request(
  path,
  {
    method = 'GET',
    body,
    auth = false,
    headers = {}
  } = {}
) {
  if (!configured) {
    throw new Error(
      'The site needs Supabase configuration. Check .env.local.'
    );
  }

  if (
    auth &&
    state.session?.expires_at &&
    state.session.expires_at < Math.floor(Date.now() / 1000) + 60
  ) {
    const refreshed = await request(
      '/auth/v1/token?grant_type=refresh_token',
      {
        method: 'POST',
        body: {
          refresh_token: state.session.refresh_token
        }
      }
    );

    state.session = {
      ...refreshed,
      expires_at:
        Math.floor(Date.now() / 1000) + refreshed.expires_in
    };

    sessionStorage.setItem(
      'devotionalSession',
      JSON.stringify(state.session)
    );
  }

  const response = await fetch(`${url}${path}`, {
    method,
    headers: {
      apikey: key,
      ...(auth && state.session?.access_token
        ? {
            Authorization: `Bearer ${state.session.access_token}`
          }
        : {}),
      ...(body
        ? {
            'Content-Type': 'application/json'
          }
        : {}),
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    let detail = {};

    try {
      detail = await response.json();
    } catch {
      // The response may not contain JSON.
    }

    throw new Error(
      detail.message ||
      detail.error_description ||
      detail.msg ||
      detail.error ||
      `Request failed (${response.status})`
    );
  }

  const responseText = await response.text();

  return responseText.trim()
    ? JSON.parse(responseText)
    : null;
}

function rest(table, query = '', options = {}) {
  return request(`/rest/v1/${table}${query}`, options);
}

function nav() {
  const links = [
    ['home', 'Home'],
    ['schedule', 'Schedule'],
    ['songs', 'Songs'],
    ['devotions', 'Devotionals'],
    ['register', 'Register'],
    ['admin', 'Admin']
  ];

  return `
    <header class="top">
      <a class="brand" href="#home">
        <span class="mark">✦</span> Family Devotion
      </a>

      <button
        id="menu"
        class="menu"
        aria-label="Toggle navigation"
      >☰</button>

      <nav id="nav">
        ${links.map(([tab, label]) => `
          <a href="#${tab}" data-tab="${tab}">${label}</a>
        `).join('')}
      </nav>
    </header>
  `;
}

function layout() {
  $('app').innerHTML = `
    ${nav()}

    <main>
      <section class="page" id="page-home">
        <div class="hero" id="hero">
          <div class="hero-content">
            <span class="eyebrow">Gather • Pray • Grow</span>

            <h1>Welcome to Our Devotion</h1>

            <p>
              Join us every Saturday evening for prayer,
              worship, and scripture.
            </p>

            <a class="button light" href="#schedule">
              View this Saturday's gathering →
            </a>
          </div>
        </div>

        <div class="home-copy">
          <p class="eyebrow" id="date"></p>

          <h2>Scripture for today</h2>

          <blockquote id="verse"></blockquote>

          <p class="reference" id="reference"></p>

          <div class="message">
            <h3>Today's message</h3>
            <p id="message"></p>

            <h3>Prayer point</h3>
            <p id="prayer"></p>

            <h3>Reflection & action</h3>
            <p id="reflection"></p>
          </div>
        </div>
      </section>

      <section class="page inner" id="page-schedule">
        <p class="eyebrow">Saturday gathering</p>

        <h1>Service schedule</h1>

        <p id="meeting"></p>

        <div id="roles"></div>

        <h2>Prayer assignments</h2>

        <div id="prayers"></div>

        <button id="schedulePdf" class="button">
          Download schedule and songs PDF
        </button>
      </section>

      <section class="page inner" id="page-songs">
        <p class="eyebrow">For our gathering</p>

        <h1>This week's songs</h1>

        <p>
          Selected praise and worship songs for the fellowship.
        </p>

        <div id="songList"></div>
      </section>

      <section class="page inner" id="page-devotions">
        <p class="eyebrow">From our community</p>

        <h1>Devotional messages</h1>

        <p>
          Share a reflection.
          New submissions appear after review.
        </p>

        <form id="devotionForm" class="form">
          <label>
            Your name
            <input
              name="author"
              required
              minlength="2"
              maxlength="100"
            >
          </label>

          <label>
            Title
            <input
              name="title"
              required
              minlength="2"
              maxlength="150"
            >
          </label>

          <label>
            Message
            <textarea
              name="body"
              required
              minlength="10"
              maxlength="10000"
              rows="7"
            ></textarea>
          </label>

          <button class="button">Submit message</button>
        </form>

        <div id="devotionList"></div>
      </section>

      <section class="page inner" id="page-register">
        <p class="eyebrow">Join our fellowship</p>

        <h1>Register your details</h1>

        <p>
          Your name and phone number are visible only
          to the administrator.
        </p>

        <form id="registerForm" class="form">
          <label>
            Full name
            <input
              name="full_name"
              autocomplete="name"
              required
              minlength="2"
              maxlength="100"
            >
          </label>

          <label>
            Phone number
            <input
              name="phone"
              type="tel"
              autocomplete="tel"
              required
              pattern="[+0-9 ()-]{7,20}"
              placeholder="+254 7XX XXX XXX"
            >
          </label>

          <button class="button">Register</button>
        </form>
      </section>

      <section class="page inner" id="page-admin">
        <p class="eyebrow">Private workspace</p>

        <h1>Admin panel</h1>

        <div id="login">
          <form id="loginForm" class="form">
            <label>
              Email
              <input
                name="email"
                type="email"
                required
                autocomplete="username"
              >
            </label>

            <label>
              Password
              <input
                name="password"
                type="password"
                required
                autocomplete="current-password"
              >
            </label>

            <button class="button">Sign in</button>
          </form>
        </div>

        <div id="adminSpace" hidden>
          <button id="signout" class="subtle">Sign out</button>

          <div class="admin-grid">
            <div>
              <h2>Members</h2>

              <form id="memberForm" class="form compact">
                <label>
                  Full name
                  <input
                    name="full_name"
                    required
                    minlength="2"
                    maxlength="100"
                  >
                </label>

                <label>
                  Phone
                  <input
                    name="phone"
                    type="tel"
                    required
                    pattern="[+0-9 ()-]{7,20}"
                  >
                </label>

                <button class="button">Add member</button>
              </form>

              <div id="memberList"></div>

              <button
                id="exportMembers"
                class="button secondary"
              >
                Download registrations CSV
              </button>
            </div>

            <div>
              <h2>Prayer items</h2>

              <p>
                Add exactly four prayer items.
                Each item is assigned to a different person.
              </p>

              <form id="itemForm" class="form compact">
                <label>
                  Prayer item
                  <input
                    name="item"
                    required
                    minlength="2"
                    maxlength="250"
                  >
                </label>

                <button class="button">Add item</button>
              </form>

              <div id="itemList"></div>
            </div>

            <div>
              <h2>Schedule</h2>

              <label>
                Meeting date
                <input id="meetingDate" type="date">
              </label>

              <p>
                Choose at least ten present members.
                Each person receives one assignment.
                Singer roles use eligible members.
              </p>

              <div id="presentList"></div>

              <button id="generate" class="button">
                Generate and publish schedule
              </button>

              <p class="hint">
                Generating again replaces the schedule
                for the chosen date.
              </p>
            </div>

            <div>
              <h2>Songs</h2>

              <form id="songForm" class="form compact">
                <label>
                  Title
                  <input name="title" required>
                </label>

                <label>
                  Artist
                  <input name="artist">
                </label>

                <label>
                  Category
                  <select name="category">
                    <option value="praise">Praise</option>
                    <option value="worship">Worship</option>
                  </select>
                </label>

                <label>
                  Official song link (optional)
                  <input
                    name="link"
                    type="url"
                    placeholder="https://..."
                  >
                </label>

                <button class="button">Add song</button>
              </form>

              <div id="adminSongs"></div>
            </div>

            <div>
              <h2>Homepage images</h2>

              <form id="imageForm" class="form compact">
                <label>
                  Upload an image
                  <input
                    name="image"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    required
                  >
                </label>

                <button class="button">Upload</button>
              </form>

              <div id="imageList"></div>
            </div>

            <div>
              <h2>Review messages</h2>

              <div id="reviewList"></div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer>
      Family Devotion · Saturday prayer and fellowship
    </footer>

    <div id="notice" hidden role="status"></div>
  `;

  $('menu').onclick = () => {
    $('nav').classList.toggle('open');
  };

  window.addEventListener('hashchange', route);
  route();

  $('date').textContent = stamp();

  const verse = verseForDay();

  $('verse').textContent = `“${verse.text}”`;
  $('reference').textContent = verse.ref;
  $('message').textContent = verse.message;
  $('prayer').textContent = verse.prayers[0];

  $('reflection').textContent =
    `Take a quiet moment today: how can you put ` +
    `${verse.theme} into practice?`;

  $('meetingDate').value = saturday();

  bind();
}

function route() {
  const tab = location.hash.slice(1);

  const tabs = [
    'home', 'schedule', 'songs',
    'devotions', 'register', 'admin'
  ];

  const page = tabs.includes(tab) ? tab : 'home';

  document.querySelectorAll('.page').forEach(element => {
    element.classList.toggle(
      'active',
      element.id === `page-${page}`
    );
  });

  document.querySelectorAll('[data-tab]').forEach(element => {
    element.classList.toggle(
      'active',
      element.dataset.tab === page
    );
  });

  $('nav').classList.remove('open');
  window.scrollTo(0, 0);
}

async function load() {
  try {
    const results = await Promise.all([
      rest('schedules', '?select=*&order=meeting_date.desc&limit=20'),
      rest('songs', '?select=*&order=id.desc'),
      rest('devotionals', '?select=*&order=created_at.desc&limit=100'),
      rest('hero_images', '?select=*&order=created_at.desc')
    ]);

    [
      state.schedules,
      state.songs,
      state.devotions,
      state.images
    ] = results;

    renderPublic();
  } catch (error) {
    show(error.message, true);
  }
}

function renderPublic() {
  const schedule = current();

  $('meeting').textContent = schedule
    ? `Meeting: ${schedule.meeting_date}`
    : 'No schedule has been published yet for this Saturday.';

  $('roles').innerHTML = schedule
    ? roles.map(([role, label]) => `
        <div class="row">
          <span>${label}</span>
          <strong>${esc(schedule.assignments[role] || '—')}</strong>
        </div>
      `).join('')
    : '<p>Check back for the next schedule.</p>';

  $('prayers').innerHTML = schedule?.prayers?.length
    ? schedule.prayers.map(prayer => `
        <div class="row">
          <strong>${esc(prayer.person)}</strong>
          <span>${esc(prayer.item)}</span>
        </div>
      `).join('')
    : '<p>Prayer assignments will appear here.</p>';

  const featuredSongs = state.songs.filter(
    song => song.is_featured
  );

  $('songList').innerHTML = featuredSongs.length
    ? featuredSongs.map(songHtml).join('')
    : '<p>Songs will appear here once the administrator adds them.</p>';

  const published = state.devotions.filter(
    devotion => devotion.approved
  );

  $('devotionList').innerHTML = published.length
    ? published.map(devotion => `
        <article class="entry">
          <p class="eyebrow">
            ${esc(devotion.author)} ·
            ${esc(
              new Date(devotion.created_at)
                .toLocaleDateString('en-GB')
            )}
          </p>

          <h2>${esc(devotion.title)}</h2>

          <p class="preserve">${esc(devotion.body)}</p>

          <button
            class="text-button"
            data-pdf="${devotion.id}"
          >
            Download PDF ↓
          </button>
        </article>
      `).join('')
    : '<p>No published messages yet.</p>';

  const hero = $('hero');
  let imageIndex = 0;

  clearInterval(window.heroTimer);

  function rotateImage() {
    if (!state.images.length) {
      hero.style.backgroundImage = '';
      return;
    }

    const image = state.images[
      imageIndex++ % state.images.length
    ];

    const imageUrl = encodeURI(image.image_url)
      .replace(/"/g, '%22');

    hero.style.backgroundImage = `
      linear-gradient(
        90deg,
        rgba(11,42,33,.82),
        rgba(11,42,33,.25)
      ),
      url("${imageUrl}")
    `;
  }

  rotateImage();

  if (state.images.length > 1) {
    window.heroTimer = setInterval(rotateImage, 5000);
  }
}

function songHtml(song) {
  const safe = song.link && /^https:\/\//i.test(song.link);

  return `
    <div class="row">
      <span>
        <small>${esc(song.category)}</small><br>
        <strong>${esc(song.title)}</strong>
        · ${esc(song.artist)}
      </span>

      ${safe ? `
        <a
          href="${esc(song.link)}"
          target="_blank"
          rel="noopener noreferrer"
        >Listen ↗</a>
      ` : ''}
    </div>
  `;
}

async function loadAdmin() {
  if (!state.admin) return;

  try {
    [state.members, state.items] = await Promise.all([
      rest('members', '?select=*&order=full_name.asc', { auth: true }),
      rest('prayer_items', '?select=*&order=id.asc', { auth: true })
    ]);

    state.devotions = await rest(
      'devotionals',
      '?select=*&order=created_at.desc',
      { auth: true }
    );

    renderAdmin();
    renderPublic();
  } catch (error) {
    show(error.message, true);
  }
}

function renderAdmin() {
  $('memberList').innerHTML = state.members.length
    ? state.members.map(member => `
        <div class="row">
          <span>
            ${esc(member.full_name)}<br>
            <small>${esc(member.phone)}</small>
          </span>

          <span>
            <label class="check">
              <input
                type="checkbox"
                data-eligible="praise"
                data-id="${member.id}"
                ${member.eligible_praise ? 'checked' : ''}
              >
              Praise
            </label>

            <label class="check">
              <input
                type="checkbox"
                data-eligible="worship"
                data-id="${member.id}"
                ${member.eligible_worship ? 'checked' : ''}
              >
              Worship
            </label>

            <button
              class="text-button"
              data-delete="members"
              data-id="${member.id}"
            >Remove</button>
          </span>
        </div>
      `).join('')
    : '<p>No members yet.</p>';

  $('presentList').innerHTML = state.members.map(member => `
    <label class="check">
      <input
        type="checkbox"
        class="present"
        value="${member.id}"
        checked
      >
      ${esc(member.full_name)}
    </label>
  `).join('');

  $('itemList').innerHTML = state.items.map(item => `
    <div class="row">
      ${esc(item.item)}
      <button
        class="text-button"
        data-delete="prayer_items"
        data-id="${item.id}"
      >Remove</button>
    </div>
  `).join('');

  $('adminSongs').innerHTML = state.songs.map(song => `
    <div class="row">
      ${esc(song.title)}
      <button
        class="text-button"
        data-delete="songs"
        data-id="${song.id}"
      >Remove</button>
    </div>
  `).join('');

  $('imageList').innerHTML = state.images.map(image => `
    <div class="row">
      <img
        class="thumb"
        src="${esc(image.image_url)}"
        alt="Homepage slide"
      >
      <button
        class="text-button"
        data-delete="hero_images"
        data-id="${image.id}"
      >Remove</button>
    </div>
  `).join('');

  const pending = state.devotions.filter(
    devotion => !devotion.approved
  );

  $('reviewList').innerHTML = pending.length
    ? pending.map(devotion => `
        <div class="entry">
          <strong>${esc(devotion.title)}</strong>
          · ${esc(devotion.author)}

          <p class="preserve">${esc(devotion.body)}</p>

          <button
            class="text-button"
            data-approve="${devotion.id}"
          >Approve</button>

          <button
            class="text-button"
            data-delete="devotionals"
            data-id="${devotion.id}"
          >Delete</button>
        </div>
      `).join('')
    : '<p>No messages awaiting review.</p>';
}

async function refresh() {
  await load();
  await loadAdmin();
}

function values(form) {
  return Object.fromEntries(new FormData(form));
}

function action(formId, callback) {
  $(formId).addEventListener('submit', async event => {
    event.preventDefault();

    const form = event.currentTarget;
    const button = event.submitter;

    if (button) button.disabled = true;

    try {
      await callback(form);
      form.reset();

      show(
        formId === 'devotionForm'
          ? 'Message submitted for review.'
          : 'Saved successfully.'
      );

      await refresh();
    } catch (error) {
      show(error.message, true);
    } finally {
      if (button) button.disabled = false;
    }
  });
}

function bind() {
  action('registerForm', form => {
    const data = values(form);

    return rest('members', '', {
      method: 'POST',
      body: {
        full_name: data.full_name.trim(),
        phone: data.phone.trim()
      }
    });
  });

  action('devotionForm', form => {
    const data = values(form);

    return rest('devotionals', '', {
      method: 'POST',
      body: {
        author: data.author.trim(),
        title: data.title.trim(),
        body: data.body.trim()
      }
    });
  });

  action('loginForm', async form => {
    const data = values(form);

    const result = await request(
      '/auth/v1/token?grant_type=password',
      {
        method: 'POST',
        body: {
          email: data.email.trim(),
          password: data.password
        }
      }
    );

    state.session = {
      ...result,
      expires_at: Math.floor(Date.now() / 1000) + result.expires_in
    };

    sessionStorage.setItem(
      'devotionalSession',
      JSON.stringify(state.session)
    );

    await checkAdmin();

    if (!state.admin) {
      throw new Error(
        'This account does not have admin access.'
      );
    }
  });

  $('signout').onclick = () => {
    state.session = null;
    state.admin = false;
    sessionStorage.removeItem('devotionalSession');

    $('adminSpace').hidden = true;
    $('login').hidden = false;

    show('Signed out.');
  };

  action('memberForm', form => {
    const data = values(form);

    return rest('members', '', {
      method: 'POST',
      auth: true,
      body: {
        full_name: data.full_name.trim(),
        phone: data.phone.trim()
      }
    });
  });

  action('itemForm', form => {
    const data = values(form);

    return rest('prayer_items', '', {
      method: 'POST',
      auth: true,
      body: {
        item: data.item.trim()
      }
    });
  });

  action('songForm', form => {
    const data = values(form);
    const link = data.link.trim();

    if (link && !/^https:\/\//i.test(link)) {
      throw new Error('Use a secure https:// link.');
    }

    return rest('songs', '', {
      method: 'POST',
      auth: true,
      body: {
        title: data.title.trim(),
        artist: data.artist.trim(),
        category: data.category,
        link
      }
    });
  });

  action('imageForm', async form => {
    const file = form.elements.namedItem('image').files[0];

    if (
      !file ||
      !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) ||
      file.size > 5 * 1024 * 1024
    ) {
      throw new Error('Choose a JPG, PNG or WebP under 5 MB.');
    }

    const identifier = globalThis.crypto?.randomUUID
      ? globalThis.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const name = `${identifier}.${file.type.split('/')[1]}`;

    // Ensure the admin token is still valid before uploading.
    await rest('admin_users', '?select=user_id&limit=1', {
      auth: true
    });

    const response = await fetch(
      `${url}/storage/v1/object/devotional-hero/${name}`,
      {
        method: 'POST',
        headers: {
          apikey: key,
          Authorization: `Bearer ${state.session.access_token}`,
          'Content-Type': file.type
        },
        body: file
      }
    );

    if (!response.ok) {
      throw new Error('Image upload failed.');
    }

    await rest('hero_images', '', {
      method: 'POST',
      auth: true,
      body: {
        image_url:
          `${url}/storage/v1/object/public/devotional-hero/${name}`
      }
    });
  });

  $('generate').onclick = generate;

  $('exportMembers').onclick = () => {
    const rows = [
      ['Full name', 'Phone', 'Praise singer', 'Worship singer'],
      ...state.members.map(member => [
        member.full_name,
        member.phone,
        member.eligible_praise ? 'Yes' : 'No',
        member.eligible_worship ? 'Yes' : 'No'
      ])
    ];

    const csv = rows.map(row =>
      row.map(value =>
        `"${String(value).replace(/"/g, '""')}"`
      ).join(',')
    ).join('\r\n');

    const blob = new Blob(
      ['\ufeff', csv],
      { type: 'text/csv;charset=utf-8' }
    );

    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = 'fellowship-members.csv';
    link.click();

    setTimeout(() => URL.revokeObjectURL(link.href), 3000);
  };

  $('schedulePdf').onclick = () => {
    const schedule = current();

    if (!schedule) {
      show('No schedule to download yet.', true);
      return;
    }

    pdf(
      'Saturday prayer schedule',
      [],
      `schedule-${schedule.meeting_date}.pdf`
    );
  };

  document.addEventListener('click', async event => {
    const button = event.target.closest(
      '[data-delete],[data-approve],[data-pdf]'
    );

    if (!button) return;

    try {
      if (button.dataset.pdf) {
        const devotion = state.devotions.find(
          item => item.id === Number(button.dataset.pdf)
        );

        if (!devotion) return;

        pdf(
          devotion.title,
          [`By ${devotion.author}`, '', devotion.body],
          `devotional-${devotion.id}.pdf`
        );

        return;
      }

      if (button.dataset.approve) {
        await rest(
          'devotionals',
          `?id=eq.${Number(button.dataset.approve)}`,
          {
            method: 'PATCH',
            auth: true,
            body: {
              approved: true
            }
          }
        );
      } else if (button.dataset.delete) {
        const table = button.dataset.delete;

        if (
          ![
            'members', 'prayer_items', 'songs',
            'hero_images', 'devotionals'
          ].includes(table)
        ) {
          return;
        }

        if (!confirm('Remove this entry?')) return;

        await rest(
          table,
          `?id=eq.${Number(button.dataset.id)}`,
          {
            method: 'DELETE',
            auth: true
          }
        );
      }

      show('Updated.');
      await refresh();
    } catch (error) {
      show(error.message, true);
    }
  });

  document.addEventListener('change', async event => {
    const input = event.target;

    if (!input.dataset.eligible) return;

    const member = state.members.find(
      item => item.id === Number(input.dataset.id)
    );

    if (!member) return;

    try {
      await rest(
        'members',
        `?id=eq.${member.id}`,
        {
          method: 'PATCH',
          auth: true,
          body: {
            [`eligible_${input.dataset.eligible}`]: input.checked
          }
        }
      );

      await loadAdmin();
    } catch (error) {
      input.checked = !input.checked;
      show(error.message, true);
    }
  });
}

async function checkAdmin() {
  try {
    if (!state.session?.access_token) return;

    const response = await rest(
      'admin_users',
      '?select=user_id&limit=1',
      { auth: true }
    );

    state.admin = response.some(
      user => user.user_id === state.session.user.id
    );

    $('adminSpace').hidden = !state.admin;
    $('login').hidden = state.admin;

    if (state.admin) await loadAdmin();
  } catch {
    state.admin = false;
    $('adminSpace').hidden = true;
    $('login').hidden = false;
  }
}

function shuffled(list) {
  const result = [...list];

  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));

    [result[index], result[other]] =
      [result[other], result[index]];
  }

  return result;
}

async function generate() {
  const button = $('generate');
  button.disabled = true;

  try {
    const date = $('meetingDate').value;

    if (!date) throw new Error('Choose a meeting date.');

    const selected = [
      ...document.querySelectorAll('.present:checked')
    ]
      .map(input =>
        state.members.find(
          member => member.id === Number(input.value)
        )
      )
      .filter(Boolean);

    if (state.items.length !== 4) {
      throw new Error(
        'Add exactly four prayer items before generating the schedule.'
      );
    }

    if (selected.length < 10) {
      throw new Error(
        'Select at least ten present members: six for service roles ' +
        'and four different people for prayer items.'
      );
    }

    const praiseMembers = selected.filter(
      member => member.eligible_praise
    );

    const worshipMembers = selected.filter(
      member => member.eligible_worship
    );

    const pairs = praiseMembers.flatMap(praise =>
      worshipMembers
        .filter(worship => worship.id !== praise.id)
        .map(worship => ({ praise, worship }))
    );

    if (!pairs.length) {
      throw new Error(
        'Select two different eligible singers: ' +
        'one for praise and another for worship.'
      );
    }

    const previous = state.schedules.find(
      schedule => schedule.meeting_date < date
    );

    const score = pair =>
      Number(
        pair.praise.full_name !== previous?.assignments?.praise
      ) +
      Number(
        pair.worship.full_name !== previous?.assignments?.worship
      );

    const bestScore = Math.max(...pairs.map(score));
    const bestPairs = pairs.filter(pair => score(pair) === bestScore);

    const pair = bestPairs[
      Math.floor(Math.random() * bestPairs.length)
    ];

    const used = new Set([
      pair.praise.id,
      pair.worship.id
    ]);

    const assignments = {
      praise: pair.praise.full_name,
      worship: pair.worship.full_name
    };

    for (const [role] of roles) {
      if (role === 'praise' || role === 'worship') continue;

      const candidates = selected.filter(
        member => !used.has(member.id)
      );

      const fresh = candidates.filter(
        member =>
          member.full_name !== previous?.assignments?.[role]
      );

      const pool = fresh.length ? fresh : candidates;

      const person = pool[
        Math.floor(Math.random() * pool.length)
      ];

      used.add(person.id);
      assignments[role] = person.full_name;
    }

    const prayerMembers = shuffled(
      selected.filter(member => !used.has(member.id))
    );

    const prayers = state.items.map((item, index) => ({
      person: prayerMembers[index].full_name,
      item: item.item
    }));

    const songs = state.songs
      .filter(song => song.is_featured)
      .map(({ title, artist, category }) => ({
        title, artist, category
      }));

    await rest('schedules', '?on_conflict=meeting_date', {
      method: 'POST',
      auth: true,
      headers: {
        Prefer: 'resolution=merge-duplicates'
      },
      body: {
        meeting_date: date,
        assignments,
        prayers,
        songs,
        published_at: new Date().toISOString()
      }
    });

    show('Schedule published.');
    await refresh();

    location.hash = '#schedule';
  } catch (error) {
    show(error.message, true);
  } finally {
    button.disabled = false;
  }
}

/* PDF DESIGN */

function pdf(title, lines, filename) {
  const doc = new jsPDF();

  const green = [24, 60, 50];
  const pale = [242, 246, 241];
  const muted = [93, 111, 102];

  const clean = value => String(value ?? '')
    .replace(/[—–]/g, '-')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'");

  let y = 45;

  function pageHeader() {
    doc.setFillColor(...green);
    doc.rect(0, 0, 210, 33, 'F');

    // Simple fellowship emblem.
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.7);
    doc.circle(22, 16, 7, 'S');
    doc.line(22, 11, 22, 21);
    doc.line(18.5, 14.5, 25.5, 14.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(17);
    doc.setTextColor(255, 255, 255);
    doc.text('FAMILY DEVOTION', 35, 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Prayer, worship and fellowship', 35, 23);

    y = 45;
  }

  function ensure(height) {
    if (y + height > 274) {
      doc.addPage();
      pageHeader();
    }
  }

  function heading(text) {
    ensure(17);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...green);
    doc.text(text, 17, y);

    y += 7;
  }

  function table(label, columns, rows, widths) {
    ensure(32);
    heading(label);

    function header() {
      doc.setFillColor(...green);
      doc.rect(17, y, 176, 10, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);

      let x = 17;

      columns.forEach((column, index) => {
        doc.text(column, x + 3, y + 6.5);
        x += widths[index];
      });

      y += 10;
    }

    header();

    rows.forEach((row, index) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);

      const wrapped = row.map((cell, column) =>
        doc.splitTextToSize(clean(cell), widths[column] - 6)
      );

      const height = Math.max(
        11,
        Math.max(...wrapped.map(cell => cell.length)) * 5 + 6
      );

      if (y + height > 274) {
        doc.addPage();
        pageHeader();
        heading(`${label} (continued)`);
        header();
      }

      doc.setFillColor(
        ...(index % 2 === 0 ? pale : [255, 255, 255])
      );

      doc.rect(17, y, 176, height, 'F');

      doc.setDrawColor(216, 226, 216);
      doc.setLineWidth(0.2);
      doc.rect(17, y, 176, height, 'S');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...green);

      let x = 17;

      wrapped.forEach((cell, column) => {
        if (column > 0) {
          doc.line(x, y, x, y + height);
        }

        doc.text(cell, x + 3, y + 6, {
          lineHeightFactor: 1.4
        });

        x += widths[column];
      });

      y += height;
    });

    y += 12;
  }

  pageHeader();

  const schedule = filename.startsWith('schedule-')
    ? current()
    : null;

  if (schedule) {
    heading('SATURDAY PRAYER MEETING');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...muted);
    doc.text(`Meeting date: ${schedule.meeting_date}`, 17, y);

    y += 14;

    table(
      'Service roles',
      ['Role', 'Assigned person'],
      roles.map(([role, label]) => [
        label,
        schedule.assignments[role] || '-'
      ]),
      [78, 98]
    );

    table(
      'Prayer assignments',
      ['Prayer item', 'Assigned person'],
      (schedule.prayers || []).map(prayer => [
        prayer.item,
        prayer.person
      ]),
      [108, 68]
    );

    const songs = schedule.songs || [];

    if (songs.length) {
      table(
        'Songs for the gathering',
        ['Category', 'Song', 'Artist'],
        songs.map(song => [
          song.category,
          song.title,
          song.artist || '-'
        ]),
        [30, 91, 55]
      );
    } else {
      heading('Songs for the gathering');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...muted);

      doc.text(
        'No songs selected for this meeting.',
        17,
        y
      );
    }
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(...green);

    const titleLines = doc.splitTextToSize(clean(title), 176);

    titleLines.forEach(line => {
      ensure(9);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(...green);

      doc.text(line, 17, y);
      y += 9;
    });

    y += 8;

    lines.forEach(line => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);

      const wrapped = doc.splitTextToSize(clean(line), 176);

      wrapped.forEach(part => {
        ensure(6);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(...green);

        doc.text(part, 17, y);
        y += 6;
      });

      y += 4;
    });
  }

  const pages = doc.getNumberOfPages();

  for (let page = 1; page <= pages; page++) {
    doc.setPage(page);

    doc.setDrawColor(216, 226, 216);
    doc.setLineWidth(0.2);
    doc.line(17, 281, 193, 281);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...muted);

    doc.text(
      'Family Devotion | Saturday prayer and fellowship',
      17,
      287
    );

    doc.text(
      `Page ${page} of ${pages}`,
      193,
      287,
      { align: 'right' }
    );
  }

  doc.save(filename);
}

/* START */

layout();

try {
  state.session = JSON.parse(
    sessionStorage.getItem('devotionalSession') || 'null'
  );
} catch {
  state.session = null;
}

async function start() {
  await load();
  await checkAdmin();
}

start();