import React from 'react'
import { action } from '@storybook/addon-actions'
import { boolean, select } from '@storybook/addon-knobs'
import { stories, Story, Centered } from './Initialise.stories'
import TileSwitch from '../TileSwitch'
import { ServiceConnectionStatus } from 'rt-types'
import { currencyPair, spotTileData, tradeExecuted, tradeRejected } from '../test-resources/spotTileProps'

const executeTrade = action('executeTrade')

const onNotificationDismissedClick = action('Notification dismissed')

const options = {
  Rejected: 'rejected',
  Done: 'done',
  None: 'none',
}

const tradeOptions = {
  rejected: tradeRejected,
  done: tradeExecuted,
  none: null as null,
}

stories.add('Booking', () => (
  <Story>
    <Centered>
      <div
        style={{
          width: '320px',
          height: '150px',
        }}
      >
        <TileSwitch
          canPopout
          executionStatus={ServiceConnectionStatus.CONNECTED}
          onNotificationDismissed={onNotificationDismissedClick}
          currencyPair={currencyPair}
          spotTileData={{ ...spotTileData, isTradeExecutionInFlight: true }}
          executeTrade={executeTrade}
          onPopoutClick={action('On popout click')}
        />
      </div>
    </Centered>
  </Story>
))

stories.add('Executed', () => (
  <Story>
    <Centered>
      <div
        style={{
          width: '320px',
          height: '150px',
        }}
      >
        <TileSwitch
          canPopout
          executionStatus={ServiceConnectionStatus.CONNECTED}
          onNotificationDismissed={onNotificationDismissedClick}
          currencyPair={currencyPair}
          spotTileData={{ ...spotTileData, lastTradeExecutionStatus: tradeExecuted }}
          executeTrade={executeTrade}
          onPopoutClick={action('On popout click')}
        />
      </div>
    </Centered>
  </Story>
))

stories.add('Rejected', () => (
  <Story>
    <Centered>
      <div
        style={{
          width: '320px',
          height: '150px',
        }}
      >
        <TileSwitch
          canPopout
          executionStatus={ServiceConnectionStatus.CONNECTED}
          onNotificationDismissed={onNotificationDismissedClick}
          currencyPair={currencyPair}
          spotTileData={{ ...spotTileData, lastTradeExecutionStatus: tradeRejected }}
          executeTrade={executeTrade}
          onPopoutClick={action('On popout click')}
        />
      </div>
    </Centered>
  </Story>
))

stories.add('Switch', () => {
  const option = select('Notification', options, 'none')
  return (
    <Story>
      <Centered>
        <div
          style={{
            width: '320px',
            height: '150px',
          }}
        >
          <TileSwitch
            canPopout
            executionStatus={ServiceConnectionStatus.CONNECTED}
            onNotificationDismissed={onNotificationDismissedClick}
            currencyPair={currencyPair}
            spotTileData={{
              ...spotTileData,
              isTradeExecutionInFlight: boolean('Booking', false),
              lastTradeExecutionStatus: tradeOptions[option],
            }}
            executeTrade={executeTrade}
            onPopoutClick={action('On popout click')}
          />
        </div>
      </Centered>
    </Story>
  )
})
