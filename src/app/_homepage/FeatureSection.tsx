'use client';

import { useEffect, useState } from 'react';
import { Lottie } from 'xtreme-ui';
import { getAnimSrc } from '#utils/constants/common';
import './featureSection.scss';

const getHSL = (hue: number, light: number) => `hsl(${hue}, 70%, ${light}%)`;

const FeatureList = ({ items }: { items: string[] }) => {
  const [hues, setHues] = useState<number[]>([]);

  useEffect(() => {
    const baseHues = Array(items.length)
      .fill(0)
      .map((_, i) => i * (360 / items.length));
    const shuffled = [...baseHues].sort(() => Math.random() - 0.5);
    setHues(shuffled);
  }, [items]);

  if (hues.length === 0) return null;

  return items.map((item, i) => (
    <div className='featureListItem' key={i}
      style={{
        ['--lightFeatureColor' as string]: getHSL(hues[i], 80),
        ['--darkFeatureColor' as string]: getHSL(hues[i], 40),
      }}
    >
      <h1>{item.charAt(0)}</h1>
      <p>{item}</p>
    </div>
  ));
};

const FeatureSection = () => (
  <section className='featureSection' id='homepage-features'>
    <div className='featuresContent'>
      <h2>ویژگی‌های ما</h2>
      <FeatureList items={[
        'کاهش هزینه‌های عملیاتی و لجستیکی',
        'حذف واسطه‌ها بین مشتری و آشپزخانه',
        'ثبت تاریخچه تمام سفارشات مشتریان',
        'افزایش مزیت رقابتی حرفه‌ای',
        'ارتقای تجربه غذاخوری برای مشتریان',
        'حذف خطاهای انسانی در مدیریت رستوران',
      ]}
      />
    </div>
    <div className='featuresAnim'>
      <Lottie className='whyUsAnim' src={getAnimSrc('FoodMeal')} speed={0.5} />
    </div>
  </section>
);

export default FeatureSection;