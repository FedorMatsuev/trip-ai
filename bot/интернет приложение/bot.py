import re
from vkbottle.bot import Bot, Message
from vkbottle import Keyboard, KeyboardButtonColor, Text, CtxStorage
from gigachat import GigaChat
from gigachat.models import Chat, Messages

# ====================== НАСТРОЙКИ ======================
TOKEN = "vk1.a.MDpc9btDYwvRzzyZDdxuwjU61m4UVu6Sx50Jn_U8Fy0OjA4W4g8w5-8aqvWGU8FmrobjGr96Q8-bt0nhBdwlLBU5w4F6WCqNwFj62k6IWelpH2mFFix43OEMYsjDXl6Q1EMwZQBfJ5jRzxOPgYrc-llyGmDj9ibN4VNM5q8RcwbZV_NULEgG6SesMKvQV4OLXz7vKEW7usVDaqodJEl7Vg"

# Твой ключ GigaChat
GIGACHAT_CREDENTIALS = "MDE5ZGFhNjMtYzI5Zi03OGFiLWEzZDYtZTVjMDI1ZTYxMmIyOmU0ZDkxMzhiLWY5OWEtNDE1MC1hMWM0LWI4NTQxN2M1NmZlMA=="

bot = Bot(token=TOKEN)
storage = CtxStorage()


# ==========================================
# Функция проверки номера телефона
# ==========================================
def is_valid_russian_phone(phone: str) -> bool:
    """Проверяет, что номер начинается с +7/7/8 и содержит ровно 11 цифр"""
    cleaned = re.sub(r'[^0-9+]', '', phone.strip())

    if cleaned.startswith('+7'):
        cleaned = '7' + cleaned[2:]
    elif cleaned.startswith('8'):
        cleaned = '7' + cleaned[1:]
    elif cleaned.startswith('7'):
        pass
    else:
        return False

    return len(cleaned) == 11 and cleaned[0] == '7'


def normalize_phone(phone: str) -> str:
    """Приводит номер к красивому виду +7XXXXXXXXXX"""
    cleaned = re.sub(r'[^0-9+]', '', phone.strip())
    if cleaned.startswith('+7'):
        return cleaned
    elif cleaned.startswith('8'):
        return '+7' + cleaned[1:]
    elif cleaned.startswith('7'):
        return '+7' + cleaned[1:]
    return '+7' + cleaned


# ==========================================
# КЛАВИАТУРЫ
# ==========================================
def main_menu():
    return (Keyboard(one_time=False)
            .add(Text("Техподдержка"), color=KeyboardButtonColor.PRIMARY)
            .row()
            .add(Text("Информация про разработчиков"), color=KeyboardButtonColor.SECONDARY)
            .get_json())


def support_menu():
    return (Keyboard(one_time=False)
            .add(Text("Отмена поездки"))
            .add(Text("Забыл вещи"))
            .row()
            .add(Text("Жалоба"))
            .add(Text("Не работает сайт"))
            .row()
            .add(Text("Не прошла оплата"))
            .add(Text("Предложить идею"))
            .row()
            .add(Text("Помощь разработчикам"))
            .add(Text("Прочее"))
            .row()
            .add(Text("Вернуться назад"), color=KeyboardButtonColor.NEGATIVE)
            .get_json())


def other_ai_menu():
    return (Keyboard(one_time=False)
            .add(Text("Подключить ИИ"), color=KeyboardButtonColor.POSITIVE)
            .add(Text("Без ИИ"), color=KeyboardButtonColor.SECONDARY)
            .row()
            .add(Text("Вернуться назад"), color=KeyboardButtonColor.NEGATIVE)
            .get_json())


def dev_menu():
    return (Keyboard(one_time=False)
            .add(Text("Ссылка на сайт"))
            .row()
            .add(Text("Разработчик Михаил"))
            .add(Text("Разработчик Артем"))
            .row()
            .add(Text("Разработчик Федор"))
            .row()
            .add(Text("Вернуться назад"), color=KeyboardButtonColor.NEGATIVE)
            .get_json())


# ==========================================
# ОБРАБОТЧИКИ КНОПОК
# ==========================================

@bot.on.message(text=["привет", "старт", "начать"])
async def start(message: Message):
    # Удаляем старые данные только если они есть
    if storage.contains(message.from_id):
        storage.delete(message.from_id)
    await message.answer("👋 Добро пожаловать! Выберите нужный раздел:", keyboard=main_menu())

@bot.on.message(text="Техподдержка")
async def support_base(message: Message):
    await message.answer("🛠 Какая помощь вам требуется?", keyboard=support_menu())


@bot.on.message(text="Информация про разработчиков")
async def dev_info_menu(message: Message):
    await message.answer("👥 Информация о команде:", keyboard=dev_menu())


@bot.on.message(text="Вернуться назад")
async def back_to_main(message: Message):
    if storage.contains(message.from_id):
        storage.delete(message.from_id)
    await message.answer("Вы вернулись в главное меню 👇", keyboard=main_menu())


# Кнопки, где нужен номер телефона
phone_actions = {
    "Отмена поездки": "wait_phone_refund",
    "Не прошла оплата": "wait_phone_pay_error",
    "Забыл вещи": "wait_phone_lost",
}

for text, state in phone_actions.items():
    @bot.on.message(text=text)
    async def phone_request(message: Message, text=text, state=state):
        storage.set(message.from_id, state)
        await message.answer(f"📱 {text}\n\nВведите ваш номер телефона в формате:\n+79161234567 или 89161234567")


# Кнопки без номера
@bot.on.message(text="Жалоба")
async def sup_complaint(message: Message):
    storage.set(message.from_id, "wait_complaint")
    await message.answer("📝 Пожалуйста, опишите вашу жалобу:")


@bot.on.message(text="Не работает сайт")
async def sup_site(message: Message):
    storage.set(message.from_id, "wait_site_error")
    await message.answer("💻 Опишите, что именно не работает:")


@bot.on.message(text="Предложить идею")
async def sup_idea(message: Message):
    storage.set(message.from_id, "wait_idea")
    await message.answer("💡 Напишите вашу идею:")


@bot.on.message(text="Помощь разработчикам")
async def sup_help_dev(message: Message):
    await message.answer(
        "🙏 Поддержать проект можно по номеру:\n89160369292\nТ-Банк, Антонович М.",
        keyboard=support_menu()
    )


@bot.on.message(text="Прочее")
async def sup_other(message: Message):
    storage.set(message.from_id, "wait_other_choice")
    await message.answer("📩 Выберите режим:", keyboard=other_ai_menu())


# Выбор режима ИИ
@bot.on.message(text="Подключить ИИ")
async def enable_ai(message: Message):
    storage.set(message.from_id, "wait_other_ai")
    await message.answer("✅ ИИ подключён! Задавайте любой вопрос.", keyboard=other_ai_menu())


@bot.on.message(text="Без ИИ")
async def disable_ai(message: Message):
    storage.set(message.from_id, "wait_other")
    await message.answer("📩 Напишите ваш вопрос или обращение:", keyboard=other_ai_menu())


# ==========================================
# ИНФОРМАЦИЯ ПРО РАЗРАБОТЧИКОВ (прямые ответы)
# ==========================================
@bot.on.message(text="Ссылка на сайт")
async def dev_site(message: Message):
    await message.answer("🔗 Ссылка на сайт: [вставь сюда ссылку]")


@bot.on.message(text="Разработчик Михаил")
async def dev_mikhail(message: Message):
    await message.answer("Антонович Михаил Алексеевич\n89160369292\nhttps://vk.ru/biba88888888")


@bot.on.message(text="Разработчик Артем")
async def dev_artem(message: Message):
    await message.answer("Гнусов Артем Евгеньевич\n89857839679\nhttps://vk.ru/id269142928")


@bot.on.message(text="Разработчик Федор")
async def dev_fedor(message: Message):
    await message.answer("Мацуев Фёдор Васильевич\n89950259469\nhttps://vk.ru/id601146058")


# ==========================================
# ГЛОБАЛЬНЫЙ ОБРАБОТЧИК
# ==========================================
@bot.on.message()
async def global_handler(message: Message):
    user_id = message.from_id
    state = storage.get(user_id) if storage.contains(user_id) else None

    if not state:
        await message.answer("Пожалуйста, воспользуйтесь кнопками меню 👇", keyboard=main_menu())
        return

    # === РЕЖИМ С GIGACHAT ===
    if state == "wait_other_ai":
        try:
            with GigaChat(credentials=GIGACHAT_CREDENTIALS, verify_ssl_certs=False) as client:
                response = client.chat(Chat(
                    messages=[Messages(role="user", content=message.text)],
                    temperature=0.7,
                    max_tokens=1024
                ))
                reply = response.choices[0].message.content
            await message.answer(reply)
            return
        except Exception as e:
            await message.answer(f"⚠️ Ошибка ИИ: {str(e)}")
            return

    # === ПРОВЕРКА НОМЕРА ТЕЛЕФОНА ===
    if state.startswith("wait_phone_"):
        if is_valid_russian_phone(message.text):
            norm_phone = normalize_phone(message.text)
            action = state.replace("wait_phone_", "")

            await message.answer(f"✅ Номер {norm_phone} принят и подтверждён форматом.")

            if action == "refund":
                await message.answer("Возврат средств будет обработан. Спасибо!")
            elif action == "pay_error":
                await message.answer("Оператор свяжется с вами по указанному номеру.")
            elif action == "lost":
                await message.answer("Мы свяжемся с вами для возврата вещей.")

            storage.delete(user_id)
            await message.answer("Чем еще я могу помочь?", keyboard=support_menu())
        else:
            await message.answer("❌ Неверный формат номера.\n\n"
                                 "Номер должен начинаться с +7 или 8 и содержать ровно 11 цифр.\n"
                                 "Пример: +79161234567 или 89161234567\n\nПопробуйте ещё раз:")
        return

    # === ОБЫЧНЫЕ ОБРАЩЕНИЯ БЕЗ НОМЕРА ===
    replies = {
        "wait_complaint": "📩 Жалоба получена и передана оператору.",
        "wait_site_error": "✅ Информация передана техническим специалистам.",
        "wait_idea": "💡 Спасибо за вашу идею! Мы её рассмотрим.",
        "wait_other": "📩 Ваше обращение принято. Мы скоро ответим.",
    }

    if state in replies:
        await message.answer(replies[state])
        storage.delete(user_id)
        await message.answer("Чем еще я могу помочь?", keyboard=support_menu())
        return

    # Если выбрали "Прочее", но не нажали кнопку ИИ
    if state == "wait_other_choice":
        await message.answer("Пожалуйста, нажмите «Подключить ИИ» или «Без ИИ»", keyboard=other_ai_menu())


if __name__ == "__main__":
    print("Бот успешно запущен!")
    bot.run_forever()