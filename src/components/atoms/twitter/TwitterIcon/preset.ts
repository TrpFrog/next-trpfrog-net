import React from 'react'

const trpfrogUrl =
  'https://res.cloudinary.com/trpfrog/image/upload/w_50,q_auto/icons_gallery/28'

const palette = {
  azukibarStick: '248, 218, 192',
  azukibarColor: '208, 138, 136',
}

export const iconPreset: Record<string, React.CSSProperties['background']> = {
  trpfrog: `url(${trpfrogUrl})`,
  azukibar_d: `
        linear-gradient(
            180deg, 
            rgba(${palette.azukibarColor},0) 32%, 
            rgba(${palette.azukibarColor},1) 32%
        ),
        linear-gradient(
            90deg,
            rgba(255,255,255,1) 38.5%,
            rgb(${palette.azukibarStick}) 38.5%,
            rgb(${palette.azukibarStick}) 62%,
            rgba(255,255,255,1) 62%
        )`,
  kyu_099: 'darkred',
  _nil_a_: 'linen',
  fmnpt: 'mediumvioletred',
  lupicure20: 'rgb(195, 220, 249)',
  sakuramochi0708: 'rgb(250, 216, 255)',
  ebioishii_u: '#cc986d',
}
