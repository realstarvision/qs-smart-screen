import React, { useEffect, useState, useRef, CSSProperties } from 'react'
import { Box, Divider } from '@mui/material'
import './style.scss'

interface columns {
  style?: object
  title: string
  key: string
  width?: string
}

export default function BasicTable({
  columns,
  data,
  className,
  onRowClick,
}: {
  columns: Array<columns>
  data: any
  className?: string
  onRowClick?: Function
}) {
  let rollspeed = 80
  let rolllinkk = useRef(null)
  let rolllinkk1 = useRef(null)

  useEffect(() => {
    // rolllinkk2.current.innerHTML = rolllinkk1.current.innerHTML
    function Marquee() {
      // console.log(rolllinkk2.current.offsetTop)
      // if (rolllinkk2.current.offsetTop - rolllinkk.current.scrollTop <= 3)
      //   rolllinkk.current.scrollTop -= rolllinkk1.current.offsetHeight
      // else {
      //   rolllinkk.current.scrollTop++
      // }
      if (rolllinkk1.current.clientHeight - (rolllinkk.current.scrollTop + rolllinkk.current.clientHeight) <= 1)
        rolllinkk.current.scrollTop = 0
      else {
        rolllinkk.current.scrollTop++
      }
    }
    let MyMar = setInterval(Marquee, rollspeed)
    rolllinkk.current.onmouseover = function () {
      clearInterval(MyMar)
    }
    rolllinkk.current.onmouseout = function () {
      MyMar = setInterval(Marquee, rollspeed)
    }
    return () => {
      clearInterval(MyMar)
    }
  }, [])

  /* 行点击事件 */
  const handleRowClick = (row) => {
    onRowClick(row)
  }

  return (
    <Box className="table-box">
      <table className={'content '} width="100%">
        <thead>
          <tr>
            {columns.map((column) => {
              return (
                <th
                  style={{
                    display: column.width ? 'inline-block' : '',
                    width: column.width || '',
                  }}
                >
                  {column.title}
                </th>
              )
            })}
          </tr>
        </thead>
      </table>
      <Divider />
      <div ref={rolllinkk} className={'rolllinkk ' + className}>
        <div ref={rolllinkk1}>
          <table className={'content '} width="100%">
            {data.map((item, index) => {
              return (
                <tr
                  style={{
                    background: index % 2 != 0 ? '#001B47' : '',
                    display: 'flex',
                  }}
                  onClick={() => handleRowClick(item)}
                >
                  {columns.map((column) => {
                    return (
                      <td
                        style={{
                          display: column.width ? 'inline-block' : '',
                          width: column.width || '',
                          ...column.style,
                        }}
                      >
                        {item[column.key]}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </table>
        </div>
      </div>
    </Box>
  )
}
