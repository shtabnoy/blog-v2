export interface Hexagon {
  id: string
  x: number
  y: number
  radius?: number
  margin?: number
}

export enum Direction {
  l = 'left',
  r = 'right',
  tr = 'top-right',
  br = 'bottom-right',
  tl = 'top-left',
  bl = 'bottom-left',
}

export interface Images {
  [id: string]: HTMLImageElement
}

export interface Article {
  id: string
  cover: {
    url: string
  }
  title: string
  category: {
    image: {
      url: string
    }
  }
}

export interface Articles {
  [id: string]: Article
}
