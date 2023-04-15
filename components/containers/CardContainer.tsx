import React, { CSSProperties, PropsWithChildren, useEffect, useState } from 'react'
import { Gutter } from 'antd/lib/grid/row'
import { Row, Col, Typography, List } from 'antd'
import { RightCircleOutlined, RightSquareOutlined } from '@ant-design/icons'

type CardProps = 'title' | 'subtitle' | 'iconOrImg'

interface CardContainerProps {
  title?: string
  subtitle?: string
  textList?: Array<string> | Object
  responsiveText?: boolean
  iconOrImg?: React.ReactElement
  direction?: 'horizontal' | 'vertical'
  itemsOrder?: Array<CardProps>
  itemsSpacing?: Gutter | [Gutter, Gutter]
  contrastColor?: string
  hoverEffect?: boolean
  onClick?: () => void
  onHover?: () => void
  iconOrImgStyle?: CSSProperties
  titleStyle?: CSSProperties
  subtitleStyle?: CSSProperties
  cardStyle?: CSSProperties
  containerStyle?: CSSProperties
  textListDecoration?: 'numbers' | 'squares' | 'circles'
  textListStyle?: CSSProperties
  disabled?: boolean
  id?: string
}

type CardContainerStylingProps = {
  [key in CardProps]: CSSProperties
}

const CardContainer: React.FC<PropsWithChildren<CardContainerProps>> = (CardContainerProps) => {
  const ItemsStyling: CardContainerStylingProps = {
    iconOrImg: {
      width: CardContainerProps.iconOrImg?.type === 'img' ? '100%' : '40px',
      height: CardContainerProps.iconOrImg?.type === 'img' ? '100%' : '40px',
      margin: CardContainerProps.iconOrImg?.type === 'img' ? '0px auto' : '0px',
      borderRadius: '10px',
      border: '1px solid transparent',
      backgroundColor: CardContainerProps.contrastColor
        ? CardContainerProps.contrastColor
        : 'transparent',
      display: 'grid',
      placeItems: 'center',
      ...CardContainerProps.iconOrImgStyle
    },
    title: {
      margin: 'auto',
      fontWeight: 'bolder',
      width: '100%',
      height: '100%',
      display: 'grid',
      placeItems: 'center left',
      ...CardContainerProps.titleStyle
    },
    subtitle: {
      margin: 'auto',
      fontWeight: 'bolder',
      color: '#2d1b6e',
      fontSize: '2rem',
      width: '100%',
      height: '100%',
      display: 'grid',
      placeItems: 'center left',
      ...CardContainerProps.subtitleStyle
    }
  }
  const { Text } = Typography
  const [cardComponentsCount, setCardComponentsCount] = useState<number>(0)

  useEffect(() => {
    let totalCount = 0
    CardContainerProps.iconOrImg && totalCount++
    CardContainerProps.title && totalCount++
    CardContainerProps.subtitle && totalCount++
    CardContainerProps.children && totalCount++
    // typeof CardContainerProps.textList === "object" &&
    //   (totalCount += Object.values(CardContainerProps.textList).length);

    Array.isArray(CardContainerProps.textList) && (totalCount += CardContainerProps.textList.length)

    setCardComponentsCount(totalCount)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={
        CardContainerProps.hoverEffect ? 'cardContainerHoverAnimation' : 'cardContentWrapper'
      }
      onMouseEnter={CardContainerProps.onHover}
      style={{
        width: '100%',
        cursor: CardContainerProps.disabled
          ? 'not-allowed'
          : CardContainerProps.hoverEffect
          ? 'pointer'
          : undefined,
        ...CardContainerProps.containerStyle
      }}
      onClick={
        CardContainerProps.onClick &&
        (CardContainerProps.disabled === false || CardContainerProps.disabled === undefined)
          ? CardContainerProps.onClick
          : () => {}
      }
    >
      <Row
        id={CardContainerProps.id}
        className="customComponentCard"
        style={{
          position: 'relative',
          borderRadius: '20px',
          boxShadow: '4px 2px 14px rgba(45, 27, 110, 0.13)',
          filter: CardContainerProps.disabled ? 'grayscale(1)' : 'grayscale(0)',
          overflow: 'hidden',
          height: '100%',
          padding: '20px',
          backgroundColor: 'white',
          zIndex: 2,
          ...CardContainerProps.cardStyle
        }}
        gutter={CardContainerProps.itemsSpacing ? CardContainerProps.itemsSpacing : [0, 0]}
      >
        {CardContainerProps.itemsOrder ? (
          <>
            {CardContainerProps.itemsOrder.map((item) => {
              return (
                <Col
                  span={
                    CardContainerProps.direction === 'horizontal'
                      ? CardContainerProps.itemsOrder && 24 / CardContainerProps.itemsOrder?.length
                      : 24
                  }
                  key={item}
                  style={ItemsStyling[item]}
                >
                  {CardContainerProps[item]}
                </Col>
              )
            })}
          </>
        ) : (
          <>
            {CardContainerProps.iconOrImg ? (
              <Col
                span={CardContainerProps.direction === 'horizontal' ? 24 / cardComponentsCount : 24}
              >
                <div style={ItemsStyling.iconOrImg} className="iconOrImgContainer">
                  {CardContainerProps.iconOrImg}
                </div>
              </Col>
            ) : null}

            {CardContainerProps.title ? (
              <Col
                span={CardContainerProps.direction === 'horizontal' ? 24 / cardComponentsCount : 24}
                style={ItemsStyling.title}
              >
                <Text
                  id={CardContainerProps.responsiveText ? 'responsiveTitleText' : 'normalTitleText'}
                >
                  {CardContainerProps.title}
                </Text>
              </Col>
            ) : null}

            {CardContainerProps.subtitle ? (
              <Col
                span={CardContainerProps.direction === 'horizontal' ? 24 / cardComponentsCount : 24}
                style={ItemsStyling.subtitle}
              >
                <Text
                  id={
                    CardContainerProps.responsiveText
                      ? 'responsiveSubtitleText'
                      : 'normalSubtitleText'
                  }
                >
                  {CardContainerProps.subtitle}
                </Text>
              </Col>
            ) : null}

            {CardContainerProps.textList ? (
              <Col
                span={
                  CardContainerProps.direction === 'horizontal'
                    ? cardComponentsCount === Object.values(CardContainerProps.textList).length ||
                      (Array.isArray(CardContainerProps.textList) &&
                        cardComponentsCount === CardContainerProps.textList.length)
                      ? 24
                      : (24 / cardComponentsCount) *
                        Object.values(CardContainerProps.textList).length
                    : 24
                }
                style={{ margin: 'auto 0px' }}
              >
                {Array.isArray(CardContainerProps.textList) ? (
                  <List
                    grid={
                      CardContainerProps.direction === 'horizontal'
                        ? {
                            gutter: 0,
                            column: CardContainerProps.textList.length
                          }
                        : undefined
                    }
                    size="default"
                    dataSource={CardContainerProps.textList}
                    renderItem={(item, index) => (
                      <List.Item
                        style={
                          CardContainerProps.direction === 'horizontal'
                            ? {
                                padding: 0,
                                margin: 0,
                                textAlign: 'center'
                              }
                            : undefined
                        }
                      >
                        <List.Item.Meta
                          avatar={
                            CardContainerProps.textListDecoration === 'circles' ? (
                              <RightCircleOutlined />
                            ) : CardContainerProps.textListDecoration === 'squares' ? (
                              <RightSquareOutlined />
                            ) : CardContainerProps.textListDecoration === 'numbers' ? (
                              <h5
                                style={{
                                  width: '25px',
                                  height: '25px',
                                  display: 'grid',
                                  placeItems: 'center',
                                  fontWeight: 'bolder'
                                }}
                              >
                                {index + 1}.
                              </h5>
                            ) : undefined
                          }
                          title={
                            <Text
                              style={CardContainerProps.textListStyle}
                              id={
                                CardContainerProps.responsiveText ? 'responsiveText' : 'normalText'
                              }
                            >
                              {item}
                            </Text>
                          }
                        />
                      </List.Item>
                    )}
                  />
                ) : (
                  <List
                    size="default"
                    grid={
                      CardContainerProps.direction === 'horizontal'
                        ? {
                            gutter: 0,
                            column: Object.values(CardContainerProps.textList).length
                          }
                        : undefined
                    }
                    dataSource={Object.entries(CardContainerProps.textList).map((entry) => {
                      const [key, value] = entry
                      return {
                        title: key,
                        description: value
                      }
                    })}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          title={
                            <Text
                              id={
                                CardContainerProps.responsiveText
                                  ? 'responsiveTitleText'
                                  : 'normalTitleText'
                              }
                            >
                              {item.title}
                            </Text>
                          }
                          description={
                            <Text
                              style={{ color: 'grey' }}
                              id={
                                CardContainerProps.responsiveText ? 'responsiveText' : 'normalText'
                              }
                            >
                              {item.description}
                            </Text>
                          }
                        />
                      </List.Item>
                    )}
                  />
                )}
              </Col>
            ) : null}

            {CardContainerProps.children ? (
              <Col
                span={CardContainerProps.direction === 'horizontal' ? 24 / cardComponentsCount : 24}
                style={{ height: '100%' }}
              >
                {CardContainerProps.children}
              </Col>
            ) : null}
          </>
        )}
      </Row>
    </div>
  )
}

export default CardContainer
