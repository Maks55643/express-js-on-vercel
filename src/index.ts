// Telegram Mini App API
const tg = window.Telegram.WebApp;

// Раскрываем на весь экран
tg.expand();

// Тип пользователя
type TgUser = {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
};

// Получаем данные пользователя
const user: TgUser | undefined = tg.initDataUnsafe?.user;

// DOM
const content = document.getElementById("content") as HTMLElement;

// Проверка авторизации
if (!user) {
  content.innerHTML = "❌ Нет данных пользователя";
  throw new Error("Telegram user not found");
}

// Рендер главной
renderHome();

// ====== FUNCTIONS ======

function renderHome() {
  content.innerHTML = `
    <h3>👑 Админ панель</h3>
    <p><b>ID:</b> ${user.id}</p>
    <p><b>Username:</b> @${user.username ?? "—"}</p>
  `;
}

// Навигация
export function openSection(section: string) {
  switch (section) {
    case "applications":
      content.innerHTML = `
        <h3>📨 Заявки</h3>
        <button id="on">Включить</button>
        <button id="off">Отключить</button>
      `;
      break;

    case "admins":
      content.innerHTML = `<h3>👥 Админы</h3>`;
      break;

    case "logs":
      content.innerHTML = `<h3>📊 Логи</h3>`;
      break;

    case "settings":
      content.innerHTML = `<h3>⚙️ Настройки</h3>`;
      break;
  }
}

// Выход
export function exitApp() {
  tg.close();
}
