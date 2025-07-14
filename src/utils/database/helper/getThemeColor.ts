// تم‌های پیش‌فرض سیستم
const THEME_PRESETS: Record<string, string> = {
  default: '#2563eb',    // آبی
  restaurant: '#22c55e', // سبز
  kitchen: '#f97316',    // نارنجی
  admin: '#6366f1',      // بنفش
  customer: '#ec4899'    // صورتی
};

// حذف async و session
export const getThemeColor = (username?: string, role?: string) => {
  // اگر نقش کاربر به صورت آرگومان داده شده
  if (role) {
    return THEME_PRESETS[role] || THEME_PRESETS.default;
  }

  // اگر username داده شده باشه
  if (username) {
    return THEME_PRESETS.restaurant; // یا هر منطق دیگه‌ای که می‌خوای
  }

  // مقدار پیش‌فرض
  return THEME_PRESETS.default;
};
