export interface Hexagon {
  id: string
  x: number
  y: number
  radius?: number
  margin?: number
}

export enum Direction {
  'left',
  'right',
  'top-right',
  'bottom-right',
  'top-left',
  'bottom-left',
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
