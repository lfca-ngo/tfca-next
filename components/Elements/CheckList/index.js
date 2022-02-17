// require('./styles.less')

// import Icon, { QuestionCircleFilled } from '@ant-design/icons'
// import { Popover } from 'antd'
// import React from 'react'

// import IconCheck from '../../../assets/icons/g-check.svg'
// import { renderAsHtml } from '../../../utils'

// const CheckList = ({ data, limit, vars }) => {
//   // data can be either array or object
//   if (!data) return null
//   const isSimple = typeof data[0] === 'string'

//   let listData = data
//   if (limit) {
//     listData = data.slice(0, limit)
//   }
//   return (
//     <div className="check-list">
//       {listData.map((el, i) => {
//         const hasHelp = !!el.help
//         let isHidden = {}
//         if (!hasHelp) {
//           isHidden.visible = false
//         }
//         const helpElement = hasHelp ? (
//           <QuestionCircleFilled style={{ marginLeft: '8px' }} />
//         ) : null

//         return (
//           <div className="list-elem" key={`el-${i}`}>
//             <Icon component={IconCheck} />
//             <Popover
//               overlayClassName={'explainer-popover'}
//               {...isHidden}
//               content={el.help ? renderAsHtml(el.help) : null}
//               title={null}
//             >
//               <div className="desc">
//                 {isSimple
//                   ? el
//                   : renderAsHtml(el.text, {
//                       help: helpElement,
//                       vars: vars,
//                     })}
//               </div>
//             </Popover>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// export default CheckList
