import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 导览只展示 Notion 实际提供的分类，不创建不存在的栏目。
 * 没有分类时，依然保留归档和搜索入口。
 */
const HomeDiscover = ({ categoryOptions = [], postCount }) => {
  const showCategories = siteConfig('HEXO_HOME_NAV_BUTTONS', true, CONFIG)
  const categories =
    showCategories && Array.isArray(categoryOptions)
      ? categoryOptions.filter(category => category?.name).slice(0, 6)
      : []
  const total = Number(postCount)

  return (
    <section aria-labelledby='home-discover-title' className='mb-9 px-2'>
      <div className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-hexo-black-gray'>
        <div className='bg-gradient-to-br from-indigo-50 via-white to-white px-6 py-7 dark:from-slate-900 dark:via-hexo-black-gray dark:to-hexo-black-gray sm:px-9 sm:py-9'>
          <div className='flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between'>
            <div>
              <p className='mb-2 text-xs font-semibold uppercase tracking-[0.19em] text-indigo-600 dark:text-indigo-300'>
                EXPLORE THE JOURNAL
              </p>
              <h2
                id='home-discover-title'
                className='text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl'
              >
                找一点你感兴趣的内容
              </h2>
              <p className='mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300'>
                技术实践、生活记录与旅途见闻，从一个话题开始探索。
              </p>
            </div>
            {Number.isFinite(total) && total >= 6 && (
              <p className='shrink-0 text-sm text-slate-500 dark:text-slate-400'>
                已分享{' '}
                <span className='font-bold text-slate-900 dark:text-white'>
                  {total}
                </span>{' '}
                篇文章
              </p>
            )}
          </div>
          {categories.length > 0 && (
            <nav
              aria-label='文章分类快捷入口'
              className='mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3'
            >
              {categories.map((category, index) => (
                <SmartLink
                  key={category.name}
                  href={'/category/' + encodeURIComponent(category.name)}
                  className='group flex min-w-0 items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:border-indigo-400'
                >
                  <span className='min-w-0 truncate text-sm font-semibold sm:text-base'>
                    {category.name}
                  </span>
                  <span
                    aria-hidden='true'
                    className='shrink-0 text-xs text-slate-400 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-300'
                  >
                    {String(index + 1).padStart(2, '0')} ↗
                  </span>
                </SmartLink>
              ))}
            </nav>
          )}
          <div className='mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium'>
            <SmartLink
              href='/category'
              className='text-indigo-700 hover:underline dark:text-indigo-300'
            >
              全部分类 →
            </SmartLink>
            <SmartLink
              href='/archive'
              className='text-slate-600 hover:underline dark:text-slate-300'
            >
              文章归档 →
            </SmartLink>
            <SmartLink
              href='/search'
              className='text-slate-600 hover:underline dark:text-slate-300'
            >
              搜索文章 →
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeDiscover
