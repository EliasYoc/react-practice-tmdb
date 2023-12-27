import { Cover, Poster, PosterWrapper } from './styles'
import { CSSProperties } from 'react'

type CustomStyle = CSSProperties & {
  '--viewTransitionName'?: string;
};

const PageCover = ({ srcPoster, srcBackdrop, title, id }) => {
  const posterInlineStyle: CustomStyle = { "--viewTransitionName": "poster" }
  return (
    <Cover style={{ backgroundImage: `url(${srcBackdrop})` }}>
      <PosterWrapper
      >
        <Poster src={srcPoster} alt={title} style={posterInlineStyle} />
      </PosterWrapper>

    </Cover>
  )
}

export default PageCover