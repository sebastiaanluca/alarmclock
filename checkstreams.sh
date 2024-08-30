#!/bin/bash

streams=(
    "https://23553.live.streamtheworld.com/OWR_DABAAC.aac"
    "https://somafm.com/thetrip.pls"
    "https://somafm.com/dubstep.pls"
    "https://somafm.com/poptron.pls"
    "https://somafm.com/u80s.pls"
    "http://stream.dancewave.online:8080/dance.aac.m3u"
    "http://www.danceattack.fm/Dance_Attack_FM.m3u"
    "http://pulseedm.cdnstream1.com:8124/1373_128.m3u"
    "https://plusfm.net/m3u/plusfm-multi.m3u"
    "http://108.178.13.122:8195/listen.pls"
    "http://192.99.41.102:5429/listen.pls"
    "http://62.210.105.16:7000/listen.pls"
    "https://streams.ilovemusic.de/iloveradio1.mp3"
    "https://streams.ilovemusic.de/iloveradio2.mp3"
    "https://streams.ilovemusic.de/iloveradio6.mp3"
    "https://streams.ilovemusic.de/iloveradio21.mp3"
    "https://playerservices.streamtheworld.com/api/livestream-redirect/OWR_INTERNATIONAL_ADP.m3u8"
    "https://25583.live.streamtheworld.com/TOPSPINNING.mp3"
    "https://25483.live.streamtheworld.com/TOPVERSUZ.mp3"
    "https://playerservices.streamtheworld.com/api/livestream-redirect/OWR_VLAABRX.mp3"
)

for stream in "${streams[@]}"; do
    if curl --output /dev/null --silent --head --fail "$stream"; then
        echo "✅ $stream"
    else
        echo "❌ $stream"
    fi
done
