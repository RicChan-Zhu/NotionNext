import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import { BlogPostCardInfo } from './BlogPostCardInfo'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  const showPreview =
    siteConfig('HEXO_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  // 避免写入 post 属性（文章数据可能在多个组件中复用）。
  const cover =
    post?.pageCoverThumbnail ||
    (siteConfig('HEXO_POST_LIST_COVER_DEFAULT', null, CONFIG)
      ? siteInfo?.pageCover
      : null)
  const showPageCover =
    siteConfig('HEXO_POST_LIST_COVER', null, CONFIG) && cover && !showPreview
  // Notion 默认纯色封面改为可读的栏目卡片，避免列表充满相同色块。
  const isPlaceholderCover = /\/images\/page-cover\/solid_[^/?]+\.png/.test(
    cover || ''
  )
  //   const delay = (index % 2) * 200

  return (
    <div
      className={`${siteConfig('HEXO_POST_LIST_COVER_HOVER_ENLARGE', null, CONFIG) ? ' hover:scale-110 transition-all duration-150' : ''}`}
    >
      <div
        key={post.id}
        className={`blog-post-card group md:min-h-56 w-full flex justify-between md:flex-row flex-col-reverse shadow-sm transition-shadow duration-300 hover:shadow-lg ${siteConfig('HEXO_POST_LIST_IMG_CROSSOVER', null, CONFIG) && index % 2 === 1 ? 'md:flex-row-reverse' : ''}
                    overflow-hidden border dark:border-black rounded-xl bg-white dark:bg-hexo-black-gray`}
      >
        {/* 文字内容 */}
        <BlogPostCardInfo
          index={index}
          post={post}
          showPageCover={showPageCover}
          showPreview={showPreview}
          showSummary={showSummary}
        />

        {/* 图片封面 */}
        {showPageCover && (
          <div className='md:w-5/12 overflow-hidden'>
            <SmartLink href={post?.href}>
              {isPlaceholderCover ? (
                <div className='relative flex h-56 flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-100 via-violet-50 to-slate-200 p-6 text-indigo-900 transition-transform duration-500 group-hover:scale-105 dark:from-indigo-950 dark:via-slate-900 dark:to-slate-800 dark:text-indigo-100'>
                  <span className='text-xs font-semibold uppercase tracking-[0.2em] opacity-70'>
                    KOMOZ · NOTES
                  </span>
                  <span className='line-clamp-2 text-2xl font-bold leading-snug'>
                    {post?.category || '阅读笔记'}
                  </span>
                  <span
                    aria-hidden='true'
                    className='absolute -bottom-16 -right-10 h-48 w-48 rounded-full border-[32px] border-white/30'
                  />
                </div>
              ) : (
                <LazyImage
                  priority={index === 0}
                  alt={post?.title}
                  src={cover}
                  className='h-56 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105'
                />
              )}
            </SmartLink>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPostCard
