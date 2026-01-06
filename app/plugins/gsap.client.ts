import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'

export default defineNuxtPlugin(() => {
    if (process.client) {
        gsap.registerPlugin(ScrollTrigger, Flip)
    }
})
