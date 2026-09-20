/* Контур — деловой клуб.
   Данные демонстрационные, состояние хранится только в браузере посетителя. */

(function () {
  "use strict";

  /* ---------------------------------------------------------------- данные */

  // Единая таксономия: по ней считается пересечение «ищу» × «предлагаю».
  var TAGS = [
    { id: "logistics",  label: "Логистика и склад" },
    { id: "production", label: "Производство" },
    { id: "export",     label: "Экспорт и ВЭД" },
    { id: "legal",      label: "Право и сделки" },
    { id: "finance",    label: "Финансы и учёт" },
    { id: "invest",     label: "Инвестиции" },
    { id: "it",         label: "ИТ и автоматизация" },
    { id: "marketing",  label: "Маркетинг и трафик" },
    { id: "sales",      label: "Продажи и дистрибуция" },
    { id: "hr",         label: "Найм и команда" },
    { id: "retail",     label: "Ритейл и полки" },
    { id: "design",     label: "Бренд и упаковка" }
  ];

  var MEMBERS = [
    {
      id: "sokolova", name: "Марина Соколова", role: "Операционный директор",
      company: "«Плотина», логистический оператор", city: "Казань", industry: "Логистика",
      since: 2021, deals: 7,
      bio: "Девять складов в Поволжье, 140 машин на маршрутах. В клубе с первого сезона, ведёт разборы по цепочкам поставок.",
      offersText: ["Ответственное хранение в Поволжье", "Аудит цепочки поставок за две недели", "Контакты железнодорожных операторов"],
      needsText: ["Подрядчик на внедрение WMS", "Юрист по таможенным спорам"],
      offers: ["logistics", "export"], needs: ["it", "legal"]
    },
    {
      id: "gladkih", name: "Артём Гладких", role: "Основатель",
      company: "Fabrika CNC, контрактное производство", city: "Екатеринбург", industry: "Производство",
      since: 2022, deals: 5,
      bio: "Мелкосерийная обработка металла: от прототипа до партии в 3 000 единиц. Пришёл в клуб за дистрибуцией, остался ради разборов.",
      offersText: ["Прототип из металла за 10 дней", "Мелкие серии без входного минимума", "Экскурсия по цеху для участников"],
      needsText: ["Дистрибьютор в Казахстане и Узбекистане", "Инженер-технолог в штат"],
      offers: ["production"], needs: ["sales", "hr", "export"]
    },
    {
      id: "bayramova", name: "Нина Байрамова", role: "Партнёр",
      company: "«Барс и партнёры»", city: "Москва", industry: "Право",
      since: 2020, deals: 11,
      bio: "Сопровождает сделки M&A в среднем бизнесе. Семь сделок клуба прошли через её due diligence.",
      offersText: ["Due diligence перед сделкой", "Структурирование продажи доли", "Договоры с ИТ-подрядчиками"],
      needsText: ["Клиенты в e-commerce", "Финмоделист на проект"],
      offers: ["legal"], needs: ["retail", "finance"]
    },
    {
      id: "dyomin", name: "Кирилл Дёмин", role: "Технический директор",
      company: "Rivet, B2B SaaS", city: "Новосибирск", industry: "ИТ",
      since: 2023, deals: 3,
      bio: "Собирает интеграции между ERP, складом и производством. Готов к пилоту на заводе — бесплатно, ради кейса.",
      offersText: ["Интеграция ERP и складского учёта", "Аудит инфраструктуры за счёт клуба", "Трекинг заказов для логистики"],
      needsText: ["Пилотная площадка на производстве", "Senior-разработчики"],
      offers: ["it"], needs: ["production", "hr"]
    },
    {
      id: "zhumabaeva", name: "Сауле Жумабаева", role: "Основатель",
      company: "«Коралл», 14 магазинов косметики", city: "Алматы", industry: "Ритейл",
      since: 2022, deals: 6,
      bio: "Выросла с одной точки до сети в трёх городах. Берёт на полку по два новых бренда в сезон.",
      offersText: ["Полка для нового бренда", "Опыт запуска франшизы", "Вход в казахстанский ритейл"],
      needsText: ["Поставщик косметики из ЕС", "Подрядчик по подбору линейного персонала"],
      offers: ["retail", "sales"], needs: ["export", "hr"]
    },
    {
      id: "ruzhin", name: "Павел Ружин", role: "Инвестиционный директор",
      company: "фонд «Кромка»", city: "Москва", industry: "Инвестиции",
      since: 2020, deals: 9,
      bio: "Чеки от 30 до 150 млн ₽ в промтех и логистику. На встречах разбирает, почему фонды отказывают.",
      offersText: ["Раунд 30–150 млн ₽", "Подготовка к due diligence", "Разбор питча один на один"],
      needsText: ["Проекты в промышленных технологиях", "Отраслевые эксперты для оценки"],
      offers: ["invest", "finance"], needs: ["production", "it"]
    },
    {
      id: "kats", name: "Дарья Кац", role: "Руководитель маркетинга",
      company: "«Тёплый дом», сеть DIY", city: "Санкт-Петербург", industry: "Маркетинг",
      since: 2021, deals: 4,
      bio: "Отвечает за трафик 40 магазинов и маркетплейсы. Обменивается совместными промо с участниками клуба.",
      offersText: ["Аудит платного трафика", "Совместные промо с сетью", "Доступ к медиаплощадкам сети"],
      needsText: ["Подрядчик по CRM-маркетингу", "Спикеры на клиентские дни"],
      offers: ["marketing", "retail"], needs: ["it", "marketing"]
    },
    {
      id: "meshcheryakov", name: "Олег Мещеряков", role: "Владелец",
      company: "«Север-Агро»", city: "Тюмень", industry: "АПК",
      since: 2023, deals: 2,
      bio: "12 тысяч гектаров и элеватор. Ищет переработку, чтобы перестать продавать сырьё.",
      offersText: ["Долгосрочные контракты на сырьё", "Площадки под переработку", "Логистика зерна по УрФО"],
      needsText: ["Партнёр по переработке", "Экспортный брокер"],
      offers: ["production", "logistics"], needs: ["production", "export"]
    },
    {
      id: "vereshchagina", name: "Инга Верещагина", role: "HR-директор",
      company: "Nexo Group", city: "Минск", industry: "Найм",
      since: 2022, deals: 5,
      bio: "Закрывает редкие инженерные и финансовые роли. Делится воронкой найма с участниками бесплатно.",
      offersText: ["Подбор редких ролей", "Ревью системы мотивации", "Шаблоны офферов и грейдов"],
      needsText: ["Провайдер ДМС на 300 человек", "Офис 400 м² в центре"],
      offers: ["hr"], needs: ["finance", "legal"]
    },
    {
      id: "aliev", name: "Рустам Алиев", role: "Финансовый директор",
      company: "«Меркурий Тех»", city: "Баку", industry: "Финансы",
      since: 2021, deals: 6,
      bio: "Прошёл два аудита большой четвёрки. Собирает финмодели для участников перед раундом.",
      offersText: ["Финмодель под раунд", "Подготовка к аудиту", "Валютные расчёты через банки Кавказа"],
      needsText: ["Инвестор в региональный финтех", "Юрист по трансграничным сделкам"],
      offers: ["finance", "export"], needs: ["invest", "legal"]
    },
    {
      id: "prohorova", name: "Елена Прохорова", role: "Основатель",
      company: "студия «Формат»", city: "Тбилиси", industry: "Дизайн",
      since: 2023, deals: 3,
      bio: "Ребрендинг за шесть недель и упаковка инвестиционных презентаций. Делала деки для двух портфельных компаний «Кромки».",
      offersText: ["Ребрендинг за шесть недель", "Упаковка инвестиционной презентации", "Аудит айдентики за час"],
      needsText: ["Партнёр по digital-продакшену", "Клиенты в финтехе"],
      offers: ["design", "marketing"], needs: ["it", "finance"]
    },
    {
      id: "veresov", name: "Глеб Вересов", role: "Директор по развитию",
      company: "«ТрансКонтакт»", city: "Владивосток", industry: "Логистика",
      since: 2022, deals: 8,
      bio: "Возит сборные грузы из Китая, держит собственную таможенную группу. Помогает участникам с первой поставкой.",
      offersText: ["Доставка сборных грузов из Китая", "Таможенное оформление под ключ", "Проверка китайского поставщика"],
      needsText: ["Складские мощности в ЦФО", "ИТ-решение для трекинга"],
      offers: ["export", "logistics"], needs: ["logistics", "it"]
    }
  ];

  var EVENTS = [
    { day: "26", month: "сен", title: "Завтрак в кругу: восемь запросов за час",
      meta: "Москва, Большая Никитская 12 · 08:30–10:00", format: "Офлайн", seats: 3, total: 12 },
    { day: "02", month: "окт", title: "Разбор сделки: как продали 40% производства",
      meta: "Онлайн · 19:00 по Москве", format: "Онлайн", seats: 31, total: 80 },
    { day: "14", month: "окт", title: "Закрытый ужин: выход в Среднюю Азию",
      meta: "Алматы, ресторан «Тары» · 19:30", format: "Офлайн", seats: 5, total: 16 },
    { day: "24", month: "окт", title: "Мастермайнд «100 дней до раунда»",
      meta: "Санкт-Петербург, Пряжка 4 · 11:00–16:00", format: "Офлайн", seats: 2, total: 10 }
  ];

  var STORE_KEY = "kontur.profile.v1";
  var SEATS_KEY = "kontur.seats.v1";

  /* --------------------------------------------------------------- утилиты */

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function tagLabel(id) {
    for (var i = 0; i < TAGS.length; i++) if (TAGS[i].id === id) return TAGS[i].label;
    return id;
  }

  function initials(name) {
    var parts = name.trim().split(/\s+/);
    return (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
  }

  function readStore(key) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function writeStore(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* приватный режим */ }
  }

  function plural(n, one, few, many) {
    var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
    return many;
  }

  /* ------------------------------------------------------------- состояние */

  var state = {
    needs: [],            // что ищет посетитель
    offers: [],           // чем посетитель полезен
    query: "",
    city: "",
    industry: "",
    sort: "match",
    me: null,             // профиль из заявки
    registered: readStore(SEATS_KEY) || {}
  };

  var saved = readStore(STORE_KEY);
  if (saved) {
    state.needs = saved.needs || [];
    state.offers = saved.offers || [];
    state.me = saved.me || null;
  }

  function everyone() {
    return state.me ? [state.me].concat(MEMBERS) : MEMBERS.slice();
  }

  /* ---------------------------------------------------------------- подбор */

  // Совпадение двустороннее: то, что нужно мне и есть у них, плюс обратное.
  function matchOf(person) {
    var hitsTheyGive = person.offers.filter(function (t) { return state.needs.indexOf(t) !== -1; });
    var hitsTheyWant = person.needs.filter(function (t) { return state.offers.indexOf(t) !== -1; });
    return { give: hitsTheyGive, want: hitsTheyWant, score: hitsTheyGive.length + hitsTheyWant.length };
  }

  /* --------------------------------------------------------------- рендеры */

  function tagListHTML(ids, hits) {
    return ids.map(function (id) {
      var hit = hits && hits.indexOf(id) !== -1;
      return '<span class="tag' + (hit ? " hit" : "") + '">' + tagLabel(id) + "</span>";
    }).join("");
  }

  function personCard(person) {
    var m = matchOf(person);
    var isYou = person.isYou;
    var badge = isYou
      ? '<span class="you-badge">ваш профиль</span>'
      : (m.score > 0 ? '<span class="match-badge">' + m.score + " " + plural(m.score, "совпадение", "совпадения", "совпадений") + "</span>" : "");

    return '<article class="person' + (isYou ? " is-you" : "") + '" tabindex="0" role="button" data-id="' + person.id + '">' +
      personTop(person, badge) +
      '<div class="exchange">' +
        '<div class="exchange-row"><span>Предлагает</span><div class="tags">' + tagListHTML(person.offers, m.give) + "</div></div>" +
        '<div class="exchange-row"><span>Ищет</span><div class="tags">' + tagListHTML(person.needs, m.want) + "</div></div>" +
      "</div>" +
    "</article>";
  }

  function personTop(person, badge) {
    return '<div class="person-top">' +
        '<span class="avatar" aria-hidden="true">' + initials(person.name) + "</span>" +
        "<span>" +
          '<span class="person-name">' + person.name + "</span><br>" +
          '<span class="person-role">' + person.role + " · " + person.company + "</span>" +
          '<span class="person-meta">' + person.city + " · " + person.industry + "</span>" +
        "</span>" + badge +
      "</div>";
  }

  function renderPeople() {
    var list = everyone().filter(function (p) {
      if (state.city && p.city !== state.city) return false;
      if (state.industry && p.industry !== state.industry) return false;
      if (state.query) {
        var hay = [p.name, p.role, p.company, p.city, p.industry]
          .concat(p.offersText, p.needsText, p.offers.map(tagLabel), p.needs.map(tagLabel))
          .join(" ").toLowerCase();
        if (hay.indexOf(state.query.toLowerCase()) === -1) return false;
      }
      return true;
    });

    list.sort(function (a, b) {
      if (a.isYou) return -1;
      if (b.isYou) return 1;
      if (state.sort === "name") return a.name.localeCompare(b.name, "ru");
      var d = matchOf(b).score - matchOf(a).score;
      return d !== 0 ? d : b.deals - a.deals;
    });

    var grid = $("#people-grid");
    grid.innerHTML = list.length
      ? list.map(personCard).join("")
      : '<p class="empty">Под такие фильтры никто не подходит. Снимите город или отрасль — таксономия запросов шире, чем кажется.</p>';

    $("#result-count").textContent = list.length + " " + plural(list.length, "участник", "участника", "участников");
  }

  function renderMatchSummary() {
    var total = state.needs.length + state.offers.length;
    var el = $("#match-summary");
    if (!total) {
      el.textContent = "Отметьте хотя бы один пункт — и каталог пересортируется по силе совпадения.";
      return;
    }
    var matched = MEMBERS.filter(function (p) { return matchOf(p).score > 0; }).length;
    el.textContent = matched
      ? "Совпали с " + matched + " " + plural(matched, "участником", "участниками", "участниками") + ". Они подняты наверх каталога."
      : "Точных совпадений нет. Попробуйте добавить смежную тему.";
  }

  function renderEvents() {
    $("#events-list").innerHTML = EVENTS.map(function (ev, i) {
      var taken = state.registered[i] ? 1 : 0;
      var left = Math.max(ev.seats - taken, 0);
      var low = left <= 3;
      return '<article class="event">' +
        '<div class="event-date"><b>' + ev.day + "</b><span>" + ev.month + "</span></div>" +
        "<div>" +
          '<div class="event-title">' + ev.title + "</div>" +
          '<div class="event-meta">' + ev.format + " · " + ev.meta + "</div>" +
        "</div>" +
        '<div class="event-cta">' +
          '<span class="seats' + (low ? " low" : "") + '">' + left + " " + plural(left, "место", "места", "мест") + " из " + ev.total + "</span>" +
          (state.registered[i]
            ? '<span class="seats">вы записаны</span>'
            : '<button class="btn btn-quiet" type="button" data-event="' + i + '">Записаться</button>') +
        "</div>" +
      "</article>";
    }).join("");
  }

  function renderChips() {
    $$("#needs-chips .chip").forEach(function (c) {
      c.setAttribute("aria-pressed", String(state.needs.indexOf(c.dataset.tag) !== -1));
    });
    $$("#offers-chips .chip").forEach(function (c) {
      c.setAttribute("aria-pressed", String(state.offers.indexOf(c.dataset.tag) !== -1));
    });
  }

  function chipsMarkup(group) {
    return TAGS.map(function (t) {
      return '<button class="chip" type="button" role="button" aria-pressed="false" data-group="' + group + '" data-tag="' + t.id + '">' + t.label + "</button>";
    }).join("");
  }

  function formChips(name) {
    return TAGS.map(function (t) {
      return '<label class="chip" data-form-chip><input type="checkbox" class="chip-input" name="' + name + '" value="' + t.id + '">' + t.label + "</label>";
    }).join("");
  }

  /* ---------------------------------------------------------------- диалог */

  function openPerson(id) {
    var person = everyone().filter(function (p) { return p.id === id; })[0];
    if (!person) return;
    var m = matchOf(person);
    var dlg = $("#person-dialog");

    $("#dialog-content").innerHTML =
      '<div class="dialog-head">' +
        '<span class="avatar" aria-hidden="true">' + initials(person.name) + "</span>" +
        "<span>" +
          '<span class="person-name" style="font-size:1.1rem">' + person.name + "</span><br>" +
          '<span class="person-role">' + person.role + " · " + person.company + "</span>" +
          '<span class="person-meta">' + person.city + " · в клубе с " + person.since + " · " + person.deals + " " + plural(person.deals, "сделка", "сделки", "сделок") + " в кругу</span>" +
        "</span>" +
        '<button class="icon-btn dialog-close" type="button" id="dialog-close" aria-label="Закрыть">✕</button>' +
      "</div>" +
      '<p class="bio">' + person.bio + "</p>" +
      '<div class="exchange">' +
        '<div class="exchange-row"><span>Предлагает</span><div><ul style="margin:0;padding-left:18px">' +
          person.offersText.map(function (t) { return "<li>" + t + "</li>"; }).join("") +
        '</ul><div class="tags" style="margin-top:8px">' + tagListHTML(person.offers, m.give) + "</div></div></div>" +
        '<div class="exchange-row"><span>Ищет</span><div><ul style="margin:0;padding-left:18px">' +
          person.needsText.map(function (t) { return "<li>" + t + "</li>"; }).join("") +
        '</ul><div class="tags" style="margin-top:8px">' + tagListHTML(person.needs, m.want) + "</div></div></div>" +
      "</div>" +
      '<div class="dialog-foot">' +
        (person.isYou
          ? '<span class="note">Это ваш профиль. Он виден только вам — заявку разбирает организатор клуба.</span>'
          : '<button class="btn btn-primary" type="button" id="ask-contact">Запросить знакомство</button>' +
            '<span class="note" id="contact-note">' + (m.score
              ? "Совпадений: " + m.score + ". Организатор представит вас на ближайшей встрече."
              : "Общих запросов пока нет — напишите, чем встреча полезна обоим.") + "</span>") +
      "</div>";

    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");

    $("#dialog-close").addEventListener("click", function () { closeDialog(dlg); });
    var ask = $("#ask-contact");
    if (ask) {
      ask.addEventListener("click", function () {
        ask.disabled = true;
        ask.textContent = "Запрос отправлен";
        $("#contact-note").textContent = "Запрос сохранён в этом браузере. Настоящая отправка появится, когда подключим почту клуба.";
      });
    }
  }

  function closeDialog(dlg) {
    if (typeof dlg.close === "function") dlg.close(); else dlg.removeAttribute("open");
  }

  /* ------------------------------------------------------------------ тема */

  function applyTheme(mode) {
    if (mode === "system") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", mode);
    writeStore("kontur.theme.v1", mode);
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }

  /* ----------------------------------------------------------------- форма */

  function collectChecked(form, name) {
    return $$('input[name="' + name + '"]:checked', form).map(function (i) { return i.value; });
  }

  function handleSubmit(e) {
    e.preventDefault();
    var form = e.target;
    var data = new FormData(form);
    var name = (data.get("name") || "").toString().trim();
    var company = (data.get("company") || "").toString().trim();
    var offers = collectChecked(form, "f-offers");
    var needs = collectChecked(form, "f-needs");
    var err = $("#form-error");

    if (!name || !company) { err.textContent = "Заполните имя и компанию — без них заявку не разобрать."; return; }
    if (!offers.length || !needs.length) { err.textContent = "Отметьте хотя бы по одному пункту в обеих колонках: клуб держится на обмене."; return; }
    err.textContent = "";

    state.me = {
      id: "me", isYou: true, name: name,
      role: (data.get("role") || "Участник").toString().trim(),
      company: company,
      city: (data.get("city") || "—").toString().trim(),
      industry: (data.get("industry") || "—").toString(),
      since: new Date().getFullYear(), deals: 0,
      bio: (data.get("about") || "Заявка на вступление подана сегодня.").toString().trim(),
      offersText: offers.map(tagLabel), needsText: needs.map(tagLabel),
      offers: offers, needs: needs
    };
    state.offers = offers;
    state.needs = needs;

    writeStore(STORE_KEY, { needs: state.needs, offers: state.offers, me: state.me });

    var matches = MEMBERS.map(function (p) { return { p: p, m: matchOf(p) }; })
      .filter(function (x) { return x.m.score > 0; })
      .sort(function (a, b) { return b.m.score - a.m.score; });

    $("#form-status").hidden = false;
    $("#form-status").textContent = matches.length
      ? "Заявка сохранена. Сразу нашли " + matches.length + " " + plural(matches.length, "человека", "человек", "человек") +
        " с встречным запросом — первый из них: " + matches[0].p.name + ", " + matches[0].p.company + "."
      : "Заявка сохранена. Прямых совпадений сейчас нет — организатор вернётся с подбором после ближайшей встречи.";

    renderChips();
    renderMatchSummary();
    renderPeople();
    document.getElementById("people").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ------------------------------------------------------------------ init */

  function init() {
    // фильтры-селекты
    var cities = everyone().map(function (p) { return p.city; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).sort();
    var industries = everyone().map(function (p) { return p.industry; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).sort();
    $("#filter-city").innerHTML = '<option value="">Все города</option>' + cities.map(function (c) { return "<option>" + c + "</option>"; }).join("");
    $("#filter-industry").innerHTML = '<option value="">Все отрасли</option>' + industries.map(function (c) { return "<option>" + c + "</option>"; }).join("");

    $("#needs-chips").innerHTML = chipsMarkup("needs");
    $("#offers-chips").innerHTML = chipsMarkup("offers");
    $("#form-offers").innerHTML = formChips("f-offers");
    $("#form-needs").innerHTML = formChips("f-needs");
    $("#f-industry").innerHTML = industries.map(function (c) { return "<option>" + c + "</option>"; }).join("");

    // предзаполняем форму из сохранённого подбора
    $$('#join-form input[name="f-offers"]').forEach(function (i) {
      if (state.offers.indexOf(i.value) !== -1) { i.checked = true; i.parentNode.setAttribute("data-on", "1"); }
    });
    $$('#join-form input[name="f-needs"]').forEach(function (i) {
      if (state.needs.indexOf(i.value) !== -1) { i.checked = true; i.parentNode.setAttribute("data-on", "1"); }
    });

    document.addEventListener("click", function (e) {
      var chip = e.target.closest ? e.target.closest(".chip[data-group]") : null;
      if (chip) {
        var arr = state[chip.dataset.group];
        var idx = arr.indexOf(chip.dataset.tag);
        if (idx === -1) arr.push(chip.dataset.tag); else arr.splice(idx, 1);
        writeStore(STORE_KEY, { needs: state.needs, offers: state.offers, me: state.me });
        renderChips(); renderMatchSummary(); renderPeople();
        return;
      }
      var card = e.target.closest ? e.target.closest(".person") : null;
      if (card) { openPerson(card.dataset.id); return; }

      var evBtn = e.target.closest ? e.target.closest("[data-event]") : null;
      if (evBtn) {
        state.registered[evBtn.dataset.event] = true;
        writeStore(SEATS_KEY, state.registered);
        renderEvents();
        return;
      }
    });

    // чекбокс-чипы в форме подсвечиваются тем же состоянием, что и в подборе
    $("#join-form").addEventListener("change", function (e) {
      if (e.target.type === "checkbox") {
        e.target.parentNode.setAttribute("aria-pressed", String(e.target.checked));
        if (e.target.checked) e.target.parentNode.setAttribute("data-on", "1");
        else e.target.parentNode.removeAttribute("data-on");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var card = e.target.closest ? e.target.closest(".person") : null;
      if (!card) return;
      e.preventDefault();
      openPerson(card.dataset.id);
    });

    $("#search").addEventListener("input", function (e) { state.query = e.target.value; renderPeople(); });
    $("#filter-city").addEventListener("change", function (e) { state.city = e.target.value; renderPeople(); });
    $("#filter-industry").addEventListener("change", function (e) { state.industry = e.target.value; renderPeople(); });
    $("#sort").addEventListener("change", function (e) { state.sort = e.target.value; renderPeople(); });
    $("#reset-match").addEventListener("click", function () {
      state.needs = []; state.offers = [];
      writeStore(STORE_KEY, { needs: [], offers: [], me: state.me });
      renderChips(); renderMatchSummary(); renderPeople();
    });
    $("#join-form").addEventListener("submit", handleSubmit);

    $("#theme-toggle").addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark");
    });
    var storedTheme = readStore("kontur.theme.v1");
    if (storedTheme && storedTheme !== "system") applyTheme(storedTheme);

    var dlg = $("#person-dialog");
    dlg.addEventListener("click", function (e) { if (e.target === dlg) closeDialog(dlg); });

    renderChips();
    renderMatchSummary();
    renderPeople();
    renderEvents();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
