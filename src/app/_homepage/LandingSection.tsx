import { useEffect, useState, MouseEvent, Dispatch, SetStateAction, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button, useXTheme } from 'xtreme-ui';
import { scrollToSection } from '#utils/helper/common';
import './landingSection.scss';
import clsx from 'clsx';

const bgImg = '/backgrounds/landingCover.png';
const overlayImg = '/backgrounds/landingCoverOverlay.png';
const maxBlurPerImage = 30;
const maxOverlayTranslate = 0.3;

const LandingSection = () => {
  const router = useRouter();
  const { isDarkTheme } = useXTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [blurBackground, setBlurBackground] = useState<number>(maxBlurPerImage);
  const [blurOverlay, setBlurOverlay] = useState<number>(maxBlurPerImage);

  const onMouseMove = (event: MouseEvent) => {
    if (window.innerWidth > 768) { // فقط برای دسکتاپ
      const target = event.target as HTMLDivElement;
      const width = target.clientWidth / 2;
      const height = target.clientHeight / 2;

      const overlayX = maxOverlayTranslate * ((event.pageX - width) / width);
      const overlayY = maxOverlayTranslate * ((event.pageY - height) / height);
      if (ref?.current) ref.current.style.transform = `translate(${overlayX}%, ${overlayY}%)`;
    }
  };

  useEffect(() => {
    const fetchImages = (src: string, setBlur: Dispatch<SetStateAction<number>>) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', src, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = (event) => {
        if (event.lengthComputable) {
          setBlur(maxBlurPerImage - (maxBlurPerImage * (event.loaded / event.total)));
        }
      };
      xhr.onload = () => setBlur(0);
      xhr.send();
    };

    fetchImages(bgImg, setBlurBackground);
    fetchImages(overlayImg, setBlurOverlay);
  }, []);

  return (
    <section className={clsx('landingSection', isDarkTheme && 'dark')} id='homepage'
      style={{ filter: `blur(${blurBackground + blurOverlay}px)` }}
    >
      <div className='coverBackground' style={{ backgroundImage: `url(${bgImg})` }} />
      <div 
        ref={ref} 
        className='coverOverlay' 
        onMouseMove={onMouseMove} 
        style={{ backgroundImage: `url(${overlayImg})` }} 
      />
      <div className='overlay' />
      <div className='landingGreeting'>
        <h1 className='head'>تحول در تجربه رستوران‌گردی</h1>
        <p className='subHead'>راحتی سفارش، لذت بیشتر</p>
        <div className='descWrapper'>
          <p className='desc'>دیگر نیازی به منوهای کاغذی و سیستم‌های پیچیده سفارش نیست</p>
          <p className='desc'>اکنون زمان OrderWorder فرا رسیده است</p>
        </div>
        <div className='greetingAction'>
          <Button label='اطلاعات بیشتر' type='secondary' onClick={() => scrollToSection('homepage-aboutus')} />
          <Button label='سفارش دهید' onClick={() => router.push('/scan')} />
        </div>
      </div>
    </section>
  );
};

export default LandingSection;