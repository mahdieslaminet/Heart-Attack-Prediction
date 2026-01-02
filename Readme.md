![Service Example](Service%20Example.png)


# ❤️ سامانه پیش‌بینی ریسک حمله قلبی با یادگیری عمیق


این پروژه یک سامانه‌  برای **پیش‌بینی ریسک بیماری / حمله قلبی** است که با استفاده از **یادگیری عمیق (Deep Learning)** و داده‌های پزشکی پیاده‌سازی شده است.

---

## 🧠 هدف پروژه

هدف این سامانه، تخمین احتمال وجود بیماری قلبی بر اساس اطلاعات پزشکی بیمار است تا به عنوان **ابزار کمکی تصمیم‌گیری** مورد استفاده قرار گیرد.



---

## 🗂 معماری سیستم


React UI->  API Gateway (YARP - .NET)  ->  FastAPI (Python)  ->  Preprocessor + Deep Learning Model
 



---

## 📊 داده‌ها (Dataset)
 
- دمو لایو: https://huggingface.co/spaces/Mohamadshirzad/HeartAttacklive
- 📄 **مقاله اصلی:**  
  https://github.com/mahdieslaminet/Heart-Attack-Prediction/blob/main/Application%20of%20Deep%20Learning%20for%20Heart%20Attack%20Prediction%20with.pdf

- 📘 **ترجمه مقاله:**  
  https://github.com/mahdieslaminet/Heart-Attack-Prediction/blob/main/Translate_Application%20of%20Deep%20Learning%20for%20Heart%20Attack%20Prediction%20with.pdf

-  **منبع:** UCI Heart Disease Dataset (Cleveland) [https://www.kaggle.com/datasets/ritwikb3/heart-disease-cleveland]
- **نوع داده:** جدولی (Tabular)
- **تعداد ویژگی‌ها:** 13
- **برچسب خروجی:** وجود یا عدم وجود بیماری قلبی

---

## 🧪 ویژگی‌های ورودی مدل

| ویژگی | توضیح |
|------|------|
| age | سن بیمار |
| sex | جنسیت |
| cp | نوع درد قفسه سینه |
| trestbps | فشار خون |
| chol | کلسترول |
| fbs | قند خون ناشتا |
| restecg | نوار قلب |
| thalach | بیشترین ضربان قلب |
| exang | درد با ورزش |
| oldpeak | افت ST |
| slope | شیب ST |
| ca | تعداد رگ‌های درگیر |
| thal | وضعیت خون‌رسانی |

---

## 🤖 مدل یادگیری عمیق

- نوع مدل: **MLP (Multi-Layer Perceptron)**
- ساختار:
  - Dense Layers
  - Batch Normalization
  - Dropout
- تابع خروجی: `Sigmoid`
- خروجی مدل: احتمال بیماری قلبی (۰ تا ۱)

---

## 📈 عملکرد مدل

| معیار | مقدار |
|------|-------|
| Accuracy | ~78% |
| AUC | ~0.93 |
| Precision | ~85% |
| Recall | ~64% |

---

## 🔌 API پیش‌بینی (FastAPI)

### Endpoint



## ⚙️ نصب و راه‌اندازی پروژه

برای اجرای کامل سامانه، لازم است هر سه بخش Backend، API Gateway و Frontend اجرا شوند.

---

### 🔹 پیش‌نیازها

اطمینان حاصل کنید نرم‌افزارهای زیر روی سیستم نصب باشند:

- Python 3.10 یا بالاتر
- Node.js (نسخه LTS)
- .NET 8 یا بالاتر
- npm
- Git

---

### 🔹 1. نصب و اجرای Backend (FastAPI + Deep Learning)

```bash
cd PredictorService

python -m venv .venv
.venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn api:app --reload
```

پس از اجرا، سرویس پیش‌بینی روی آدرس زیر در دسترس خواهد بود:
http://localhost:8000

###  🔹 2. نصب و اجرای API Gateway (YARP - .NET)
```bash
cd ApiGateway
dotnet restore
dotnet run
```

###🔹 3. نصب و اجرای Frontend (React)
cd Ui/heart-ui

npm install

npm run dev


