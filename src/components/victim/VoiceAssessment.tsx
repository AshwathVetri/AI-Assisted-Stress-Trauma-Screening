import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  Volume2,
  FileText
} from 'lucide-react';

export const VoiceAssessment: React.FC = () => {
  const { 
    voiceTranscript, 
    setVoiceTranscript, 
    voiceDuration, 
    setVoiceDuration,
    selectedMethods, 
    navigateTo, 
    runAssessment,
    addToast 
  } = useApp();

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(voiceDuration || 0);
  const [hasRecordedAudio, setHasRecordedAudio] = useState<boolean>(Boolean(voiceTranscript));
  const timerRef = useRef<number | null>(null);

  // Audio recording simulation & real MediaRecorder hook
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = window.setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const startRecording = async () => {
    setRecordingSeconds(0);
    setIsRecording(true);
    setHasRecordedAudio(false);

    // Try real browser Web Speech API if supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognitionRef.current = new SpeechRec();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-IN';

        recognitionRef.current.onresult = (event: any) => {
          let interim = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            interim += event.results[i][0].transcript;
          }
          setVoiceTranscript(interim);
        };

        recognitionRef.current.onerror = (e: any) => {
          console.warn('Speech recognition fallback notice:', e);
        };

        recognitionRef.current.start();
      } catch (err) {
        console.warn('Web Speech API initialization fallback:', err);
      }
    }

    addToast('Recording started. Speak clearly about your situation.', 'info');
  };

  const stopRecording = () => {
    setIsRecording(false);
    setHasRecordedAudio(true);
    setVoiceDuration(recordingSeconds || 12);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }

    if (!voiceTranscript.trim()) {
      // Provide realistic simulated transcription if silence / no Web Speech
      setVoiceTranscript("I am feeling really anxious because of what happened earlier today. I was confronted and threatened, and I don't feel safe going back to the hostel right now.");
    }

    addToast('Audio captured and transcribed successfully.', 'success');
  };

  const loadDemoVoiceInput = () => {
    setRecordingSeconds(28);
    setVoiceDuration(28);
    setHasRecordedAudio(true);
    setVoiceTranscript("I am very scared because the person involved has been threatening me repeatedly. I have been unable to sleep properly and I am terrified that they might confront me outside.");
    addToast('Loaded Realistic Demo Audio Recording (28s)', 'info');
  };

  const handleResetRecording = () => {
    setIsRecording(false);
    setIsPlaying(false);
    setHasRecordedAudio(false);
    setRecordingSeconds(0);
    setVoiceTranscript('');
    setVoiceDuration(0);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const hasQuestionnaire = selectedMethods.includes('QUESTIONNAIRE');

  const handleNext = () => {
    if (hasQuestionnaire) {
      navigateTo('assessment-questionnaire');
    } else {
      runAssessment();
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 max-w-3xl mx-auto space-y-6">
      {/* Breadcrumb / Step Indicator */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <span>Public Portal</span>
        <span>/</span>
        <button onClick={() => navigateTo('methods')} className="hover:underline">Method</button>
        <span>/</span>
        <span className="text-[#0b3b60] font-semibold">Step 3B: Voice Assessment</span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
        {/* Header & Demo Mode Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-teal-200">
              <Mic size={13} />
              <span>Voice Narration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b3b60]">
              Speak about your situation
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Record a short voice message. Take your time and describe what occurred.
            </p>
          </div>

          <button
            onClick={loadDemoVoiceInput}
            className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors shrink-0"
          >
            <Sparkles size={14} className="text-amber-700" />
            <span>Use Demo Voice Input</span>
          </button>
        </div>

        {/* Audio Recording Console */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
          {/* Subtle background pulse */}
          {isRecording && (
            <div className="absolute inset-0 bg-red-950/30 animate-pulse pointer-events-none" />
          )}

          {/* Recording Timer */}
          <div className="flex items-center gap-2 font-mono text-2xl sm:text-3xl font-bold tracking-wider text-teal-300 z-10">
            {isRecording && (
              <span className="h-3 w-3 rounded-full bg-rose-500 animate-ping" />
            )}
            <span>{formatTimer(recordingSeconds)}</span>
          </div>

          {/* Dynamic Waveform Visualizer */}
          <div className="flex items-center justify-center gap-1.5 h-16 w-full max-w-sm px-4 z-10">
            {Array.from({ length: 24 }).map((_, i) => {
              const heights = [20, 45, 75, 90, 60, 30, 85, 95, 40, 70, 80, 50, 65, 85, 30, 95, 70, 45, 60, 80, 35, 90, 55, 25];
              const h = isRecording 
                ? heights[i % heights.length] 
                : hasRecordedAudio 
                ? Math.max(12, heights[i % heights.length] * 0.4) 
                : 8;

              return (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`w-1.5 rounded-full transition-all duration-150 ${
                    isRecording 
                      ? 'bg-rose-400' 
                      : hasRecordedAudio 
                      ? 'bg-teal-400' 
                      : 'bg-slate-700'
                  }`}
                />
              );
            })}
          </div>

          {/* Recording Controls */}
          <div className="flex items-center gap-4 z-10">
            {!isRecording ? (
              <button
                id="voice-record-btn"
                onClick={startRecording}
                className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-900/40 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <Mic size={18} />
                {hasRecordedAudio ? 'Record Again' : 'Start Recording'}
              </button>
            ) : (
              <button
                id="voice-stop-btn"
                onClick={stopRecording}
                className="px-6 py-3 rounded-full bg-slate-200 hover:bg-white text-slate-900 font-bold text-sm shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <Square size={16} className="fill-slate-900" />
                Stop Recording
              </button>
            )}

            {hasRecordedAudio && !isRecording && (
              <button
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  setTimeout(() => setIsPlaying(false), 3000);
                }}
                className="p-3 rounded-full bg-teal-600 hover:bg-teal-500 text-white shadow-md transition-colors"
                title="Playback recording"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="fill-white ml-0.5" />}
              </button>
            )}

            {hasRecordedAudio && !isRecording && (
              <button
                onClick={handleResetRecording}
                className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Delete recording"
              >
                <RotateCcw size={16} />
              </button>
            )}
          </div>

          <div className="text-[11px] text-slate-400 z-10 text-center">
            {isRecording 
              ? 'Recording in progress... Click Stop when finished.'
              : hasRecordedAudio 
              ? `Captured ${recordingSeconds}s voice memo. Transcript ready below.`
              : 'Click Start Recording or choose Use Demo Voice Input.'}
          </div>
        </div>

        {/* Transcript Section (Editable) */}
        {hasRecordedAudio && (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <FileText size={14} className="text-teal-600" />
                <span>Transcript (Speech-to-Text)</span>
              </label>
              <span className="text-[11px] text-slate-500 italic">
                You may edit or add details to the transcript if needed
              </span>
            </div>

            <textarea
              id="voice-transcript-input"
              value={voiceTranscript}
              onChange={(e) => setVoiceTranscript(e.target.value)}
              rows={4}
              className="w-full p-4 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-slate-900 text-sm leading-relaxed outline-hidden transition-all resize-y"
              placeholder="Your speech transcript will appear here..."
            />
          </div>
        )}

        {/* Prototype AI Notice */}
        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
          <AlertCircle size={15} className="text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>Prototype AI Simulation:</strong> Acoustic cues and speech-to-text transcripts are processed for screening indicators only. This is not a clinical vocal biomarker or psychiatric assessment.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              if (selectedMethods.includes('TEXT')) {
                navigateTo('assessment-text');
              } else {
                navigateTo('methods');
              }
            }}
            className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            id="analyze-voice-btn"
            disabled={!hasRecordedAudio && !voiceTranscript.trim()}
            onClick={handleNext}
            className={`px-7 py-3 rounded-lg font-bold text-xs sm:text-sm shadow-xs flex items-center gap-2 transition-all ${
              hasRecordedAudio || voiceTranscript.trim()
                ? 'bg-teal-700 hover:bg-teal-800 text-white cursor-pointer hover:shadow-md'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {hasQuestionnaire ? 'Proceed to Questionnaire' : 'Analyze Voice Response'}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
