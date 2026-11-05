import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 首页封面：用明确的内容定位取代反复打字的欢迎语，
 * 避免第三方脚本与整屏分类按钮阻挡读者进入正文。
 */
const Hero = ({ siteInfo }) => {
  const title = siteConfig('TITLE') || siteInfo?.title
  const subtitle = siteConfig('HEXO_HOME_SUBTITLE', null, CONFIG)
  const description = siteConfig('HEXO_HOME_DESCRIPTION', null, CONFIG)
  const kicker = siteConfig('HEXO_HOME_KICKER', null, CONFIG)
  const isTemplateCover = siteInfo?.pageCover?.includes(
    '/images/page-cover/nasa_robert_stewart_spacewalk_2.jpg'
  )

  const scrollToContent = () => {
    document.getElementById('home-content')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'start'
    })
  }

  return (
    <header
      id='header'
      className='relative isolate flex h-[76svh] min-h-[520px] max-h-[850px] w-full overflow-hidden bg-slate-950 text-white'
    >
      {siteInfo?.pageCover && !isTemplateCover && (
        <LazyImage
          priority
          id='header-cover'
          alt=''
          src={siteInfo.pageCover}
          width={1920}
          height={1080}
          className='absolute inset-0 h-full w-full object-cover object-center opacity-80'
        />
      )}
      <div
        aria-hidden='true'
        className='absolute -right-24 top-12 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl'
      />
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/25'
      />
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-slate-950/20'
      />

      <div className='relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-6 pb-12 pt-24 sm:px-10 lg:px-16'>
        <div className='mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-200'>
          <span className='h-2 w-2 rounded-full bg-indigo-300' />
          {kicker}
        </div>
        <h1 className='max-w-4xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl'>
          {title}
        </h1>
        <p className='mt-6 max-w-3xl text-xl font-medium leading-snug text-white sm:text-2xl lg:text-3xl'>
          {subtitle}
        </p>
        <p className='mt-4 max-w-xl text-sm leading-7 text-slate-200 sm:text-base'>
          {description}
        </p>
        <div className='mt-9 flex flex-wrap items-center gap-3'>
          <button
            type='button'
            onClick={scrollToContent}
            className='rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg transition-colors hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
          >
            开始阅读{' '}
            <span aria-hidden='true' className='ml-2'>
              ↓
            </span>
          </button>
          <SmartLink
            href='/category'
            className='rounded-full border border-white/50 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
          >
            按主题浏览{' '}
            <span aria-hidden='true' className='ml-2'>
              ↗
            </span>
          </SmartLink>
        </div>
      </div>
      <div className='pointer-events-none absolute bottom-6 left-6 z-10 text-xs tracking-widest text-slate-300 sm:left-10 lg:left-16'>
        IDEAS · BUILDS · LIFE
      </div>
    </header>
  )
}

export default Hero
