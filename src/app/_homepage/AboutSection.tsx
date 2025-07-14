import { Button, Lottie } from 'xtreme-ui';
import { getAnimSrc } from '#utils/constants/common';
import { scrollToSection } from '#utils/helper/common';
import './aboutSection.scss';

const AboutSection = () => {
  return (
    <section className='aboutSection' id='homepage-aboutus'>
      <div className='aboutContent'>
        <h2>درباره ما</h2>
        <p>
          ما تیمی از متخصصان پرانرژی هستیم که متعهد به تحول در صنعت رستورانداری 
          از طریق تغییر روش سفارش مشتریان در رستوران شما هستیم - بدون تماس فیزیکی 
          و بدون استفاده از کاغذ.
        </p>
        <p>
          زمان آن رسیده که با روشی کارآمد، حرفه‌ای و مقرون به صرفه، فاصله بین 
          مشتریان شما و آشپزخانه را از بین ببریم.
        </p>
        <div className='aboutAction'>
          <Button label='اطلاعات بیشتر' onClick={() => scrollToSection('homepage-features')} />
          <Button label='چرا ما؟' type='secondary' onClick={() => scrollToSection('homepage-features')} />
        </div>
      </div>
      <div className='aboutAnim'>
        <Lottie className='scanMenuAnim' src={getAnimSrc('FoodScanMenu')} speed={0.8} />
      </div>
    </section>
  );
};

export default AboutSection;