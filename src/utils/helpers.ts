export const imagesUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : ''

export const splitSentence = (sentence: string): string[] => {
  // empirical number for font-size 18px and hexagon width 346px
  // TODO: automate calculations
  const LIMIT = 20

  if (sentence.length > LIMIT) {
    const lines = []
    const words = sentence.split(/\s+/)
    const total = Math.ceil(sentence.length / LIMIT)
    for (let i = 0; i < total; i++) {
      let line = ''
      while (line.length <= sentence.length / 2) {
        if (!words.length) break
        const nextWord = words.shift()
        line += nextWord + ' '
      }

      lines.push(line.trim())
    }
    return lines
  }
  return [sentence]
}

export const loadImage = (url: string) =>
  new Promise((resolve, reject) => {
    const img = new window.Image()
    img.src = `${imagesUrl}${url}`
    img.onload = (event) => resolve(event.target)
    img.onerror = (err) => reject(err)
  })

export const HEX_RADIUS = 200
export const HEX_MARGIN = 200
