/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Text, View } from 'native-base'
import { parseDocument, ElementType } from 'htmlparser2'

// const parseTag = (regex: RegExp, para: string, paraIndex: number) => {
//   const tags: JSX.Element[] = []
//   const onlyBold = para.match(regex)
//   if (onlyBold) {
//     const [, onlyText] = onlyBold
//     para.split(regex).forEach((boldpara, x) => {
//       const key = `${para}-${boldpara}-${paraIndex}-${x}`
//       if (boldpara === onlyText) {
//         tags.push(
//           <Text fontWeight={'bold'} key={key}>
//             {onlyText}
//           </Text>
//         )
//       } else {
//         tags.push(<Text key={key}>{boldpara}</Text>)
//       }
//     })
//   } else {
//     tags.push(<Text key={`${para}-${paraIndex}`}>{para || '\n'}</Text>)
//   }
//   return tags
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseHtml = (text: string): any[] => {
  // const boldRegex = /<b>(.*?)<\/b>/
  // const final: JSX.Element[] = []
  // const paragraphs = text.split(/<br>/)
  // paragraphs.forEach((para, i) => {
  //   const simplePara = para.replace('<strong>', '<b>').replace('</strong>', '</b>')
  //   const tags = parseTag(boldRegex, simplePara, i)
  //   final.push(...tags)
  // })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderTextNode = (c: any, i: number) => {
    return (
      <Text
        py={c.parent.name === 'br' ? 10 : 0}
        fontStyle={c.parent.name === 'i' ? 'italic' : 'normal'}
        fontWeight={c.parent.name === 'b' ? 'bold' : 'normal'}
        key={i}
      >
        {c.data}
      </Text>
    )
  }
  const renderElement = (c: any, i: number) => {
    const Wrapper = ['strong', 'b', 'br', 'p', 'i'].indexOf(c.name) > -1 ? Text : View
    return <Wrapper key={i}>{c.children.map((ce: any, ie: any) => renderNode(ce, ie))}</Wrapper>
  }

  const renderNode = (c: any, i: number) => {
    switch (c.type) {
      case ElementType.Text:
        return renderTextNode(c, i)
      case ElementType.Tag:
        return renderElement(c, i)
    }
    return null
  }

  return parseDocument(text).children.map((c, i) => renderNode(c, i))
}
