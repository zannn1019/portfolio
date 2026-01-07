export const useSound = () => {
  const isMuted = useState('isMuted', () => false)
  let audioContext: AudioContext | null = null

  const initContext = () => {
    if (process.client && !audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  const toggleMute = () => {
    isMuted.value = !isMuted.value
  }

  // 1. High-tech "Tick" for Hover
  const playHover = () => {
    if (isMuted.value || !process.client) return
    initContext()
    if (!audioContext) return
    if (audioContext.state === 'suspended') audioContext.resume()

    const osc = audioContext.createOscillator()
    const gain = audioContext.createGain()
    const filter = audioContext.createBiquadFilter()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, audioContext.currentTime)
    osc.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.05)

    filter.type = 'highpass'
    filter.frequency.setValueAtTime(500, audioContext.currentTime)

    gain.gain.setValueAtTime(0.05, audioContext.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.03)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(audioContext.destination)

    osc.start()
    osc.stop(audioContext.currentTime + 0.05)
  }

  // 2. Satisfying "Click/Active" Sound
  const playClick = () => {
    if (isMuted.value || !process.client) return
    initContext()
    if (!audioContext) return

    const osc = audioContext.createOscillator()
    const gain = audioContext.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(300, audioContext.currentTime)
    osc.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.1)

    gain.gain.setValueAtTime(0.1, audioContext.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1)

    osc.connect(gain)
    gain.connect(audioContext.destination)

    osc.start()
    osc.stop(audioContext.currentTime + 0.1)
  }

  // 3. Ambient "Whoosh" (Noise Burst) for Transitions
  const playWhoosh = () => {
    if (isMuted.value || !process.client) return
    initContext()
    if (!audioContext) return

    // Create noise buffer
    const bufferSize = audioContext.sampleRate * 2 // 2 seconds
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1
    }

    const noise = audioContext.createBufferSource()
    noise.buffer = buffer
    
    const filter = audioContext.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(200, audioContext.currentTime)
    filter.frequency.linearRampToValueAtTime(1000, audioContext.currentTime + 0.5)
    
    const gain = audioContext.createGain()
    gain.gain.setValueAtTime(0, audioContext.currentTime)
    gain.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.2)
    gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1.0)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(audioContext.destination)

    noise.start()
  }

  return {
    isMuted,
    toggleMute,
    playHover,
    playClick,
    playWhoosh
  }
}
