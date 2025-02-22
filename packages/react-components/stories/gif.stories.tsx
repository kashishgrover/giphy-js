import { GiphyFetch } from '@giphy/js-fetch-api'
import { IGif } from '@giphy/js-types'
import { action } from '@storybook/addon-actions'
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs'
import React, { ElementType, useCallback, useEffect, useState } from 'react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { Gif as GifComponent, GifOverlayProps, PingbackContext } from '../src'
import VideoOverlay from '../src/components/video/video-overlay'

const gf = new GiphyFetch('sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh')

const eventAction = (event: string) => (gif: IGif) => {
    action(`Gif ${event} for ${gif.id}`)()
}

const GifDemo = ({
    id,
    width,
    height,
    noLink,
    borderRadius,
    overlay,
}: {
    id: string
    width: number
    height?: number
    noLink?: boolean
    borderRadius?: number
    overlay?: ElementType<GifOverlayProps>
}) => {
    const [gif, setGif] = useState<IGif>()

    const fetch = useCallback(async () => {
        const { data: gif } = await gf.gif(id)
        setGif(gif)
    }, [id])

    useEffect(() => {
        fetch()
    }, [fetch, id])

    return gif ? (
        <GifComponent
            key={`gif-${noLink}`}
            tabIndex={1}
            borderRadius={borderRadius}
            gif={gif}
            width={width}
            height={height}
            noLink={noLink}
            onGifClick={eventAction('click')}
            onGifSeen={eventAction('seen')}
            onGifVisible={eventAction('visible')}
            onGifKeyPress={eventAction('keyPress')}
            overlay={overlay}
        />
    ) : null
}

export default {
    title: 'React Components/Gif',
    decorators: [withKnobs, jsxDecorator],
}

export const Gif = () => (
    <GifDemo id={text('id', 'ZEU9ryYGZzttn0Cva7')} width={number('width', 300)} noLink={boolean('noLink', false)} />
)

export const GifWithVideoOverlay = () => (
    <GifDemo
        id={text('id', 'D068R9Ziv1iCjezKzG')}
        width={number('width', 500)}
        noLink={boolean('noLink', false)}
        overlay={(props: GifOverlayProps) => <VideoOverlay {...props} width={number('width', 500)} />}
    />
)

export const GifWithVideoOverlayFillVideo = () => (
    <GifDemo
        id={text('id', '3BNRWBatePBETD7Bfg')}
        width={number('width', 500)}
        height={number('height', 300)}
        noLink={boolean('noLink', false)}
        overlay={(props: GifOverlayProps) => <VideoOverlay {...props} width={number('width', 500)} />}
    />
)

export const GifNoBorderRadius = () => (
    <GifDemo
        id={text('id', 'ZEU9ryYGZzttn0Cva7')}
        borderRadius={0}
        width={number('width', 300)}
        noLink={boolean('noLink', false)}
    />
)
export const Sticker = () => (
    <GifDemo id={text('id', 'l1J9FvenuBnI4GTeg')} width={number('width', 300)} noLink={boolean('noLink', false)} />
)
export const CustomPingbackGif = () => (
    <PingbackContext.Provider value={{ attributes: { 'some key': 'some value' } }}>
        <GifDemo id={text('id', 'ZEU9ryYGZzttn0Cva7')} width={number('width', 300)} noLink={boolean('noLink', false)} />
    </PingbackContext.Provider>
)
