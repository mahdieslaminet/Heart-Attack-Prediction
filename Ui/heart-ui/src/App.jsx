import { useState } from "react";

const fields = [
  { key: "age", label: "سن (به سال)", min: 20, max: 100 },

  { key: "sex", label: "جنسیت (زن = 0 ، مرد = 1)", min: 0, max: 1 },

  {
    key: "cp",
    label: "درد قفسه سینه (0=ندارد، 1=خفیف، 2=متوسط، 3=شدید)",
    min: 0,
    max: 3,
  },

  {
    key: "trestbps",
    label: "فشار خون در حالت استراحت (عدد بالایی دستگاه)",
    min: 80,
    max: 200,
  },

  {
    key: "chol",
    label: "کلسترول خون (طبق آزمایش)",
    min: 100,
    max: 400,
  },

  {
    key: "fbs",
    label: "قند خون ناشتا بالاتر از 120؟ (خیر=0 ، بله=1)",
    min: 0,
    max: 1,
  },

  {
    key: "restecg",
    label: "نوار قلب در حالت استراحت (0=طبیعی، 1=خفیف، 2=غیرطبیعی)",
    min: 0,
    max: 2,
  },

  {
    key: "thalach",
    label: "بیشترین ضربان قلب ثبت‌شده",
    min: 60,
    max: 220,
  },

  {
    key: "exang",
    label: "درد قفسه سینه هنگام فعالیت (خیر=0 ، بله=1)",
    min: 0,
    max: 1,
  },

  {
    key: "oldpeak",
    label: "افت ST در تست ورزش (عدد اعلام‌شده توسط پزشک)",
    min: 0,
    max: 6,
    step: 0.1,
  },

  {
    key: "slope",
    label: "شیب ST (0=صعودی، 1=صاف، 2=نزولی)",
    min: 0,
    max: 2,
  },

  {
    key: "ca",
    label: "تعداد رگ‌های دارای انسداد (طبق آنژیوگرافی)",
    min: 0,
    max: 4,
  },

  {
    key: "thal",
    label: "وضعیت خون‌رسانی قلب (1=طبیعی، 2=نقص ثابت، 3=نقص برگشت‌پذیر)",
    min: 1,
    max: 3,
  },
];


const initialState = Object.fromEntries(
  fields.map((f) => [f.key, f.min])
);

export default function App() {
  const [form, setForm] = useState(initialState);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const submit = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch("http://localhost:5000/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-red-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6">
         پیش بینی ریسک حمله قلبی توسعه داده شده توسط محمدعلی شیرزاده  
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-medium mb-1">
                {f.label}
                <span className="text-xs text-gray-500 mr-2">
                  (بازه: {f.min} – {f.max})
                </span>
              </label>
              <input
                type="number"
                name={f.key}
                min={f.min}
                max={f.max}
                step={f.step || 1}
                value={form[f.key]}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </div>
          ))}
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
        >
          {loading ? "در حال تحلیل..." : "محاسبه ریسک"}
        </button>
<div className="mt-8 bg-gray-50 border border-gray-200 p-5 rounded-xl text-sm leading-7 text-gray-700">
  <h2 className="font-bold mb-3">📌 راهنمای پر کردن فرم</h2>

  <p>
    این فرم برای افرادی طراحی شده که اطلاعات اولیه پزشکی یا آزمایش خون دارند.
    اگر عددی را نمی‌دانید، مقدار حداقلی آن را وارد کنید.
  </p>

  <ul className="mt-3 space-y-2 list-disc mr-5">
    <li>اعداد 0 و 1 معمولاً به معنی «خیر» و «بله» هستند.</li>
    <li>فشار خون و کلسترول از روی آزمایش یا دستگاه فشارسنج قابل برداشت هستند.</li>
    <li>در صورت نداشتن تست ورزش یا آنژیوگرافی، مقادیر صفر وارد شود.</li>
  </ul>

  <p className="mt-4 text-xs text-gray-500">
    ⚠️ این سامانه صرفاً جهت تخمین ریسک بوده و جایگزین تشخیص پزشک نیست.
  </p>
</div>

        {result && (
          <div
            className={`mt-6 p-4 rounded-xl text-center text-white ${
              result.risk_label === "HIGH"
                ? "bg-red-600"
                : result.risk_label === "MEDIUM"
                ? "bg-yellow-500"
                : "bg-green-600"
            }`}
          >
            <p className="text-lg font-semibold">
              سطح ریسک: {result.risk_label}
            </p>
            <p className="text-2xl font-bold">
              {(result.heart_attack_risk_probability * 100).toFixed(2)}٪
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
