# Voice Notes Integration

## Overview <!-- markmap: fold -->
- Enable audio chat workflow similar to iOS Claude app by recording
  audio with sox, transcribing locally with whisper.cpp, and storing
  both audio and transcript in the knowledge base for AI assistant
  access and future reference.

## Goals <!-- markmap: fold -->
### Primary Objectives
- **Record audio**: Use sox command-line utility to capture voice notes
- **Local transcription**: Use whisper.cpp to transcribe without token cost
- **Dual storage**: Keep both WAV audio and text transcript
- **AI accessibility**: Enable AI assistant to read transcripts easily

### Benefits
- **Token efficiency**: Transcription happens locally, AI reads only text
- **Offline capable**: No API calls required for transcription
- **Archival**: Original audio preserved for playback/reference
- **Fast workflow**: Quick capture of ideas via voice

## Technical Approach <!-- markmap: fold -->
### Workflow
1. Record audio using sox to WAV file
2. Run whisper.cpp locally to generate transcript
3. Store both files in `documents/audio/` directory
4. Link transcript in relevant views for navigation
5. AI assistant reads only the text transcript

### Token Cost Analysis
- **WAV files**: AI cannot transcribe audio directly (Read tool limitation)
- **Local transcription**: Zero token cost with whisper.cpp
- **Reading transcripts**: Minimal cost, same as any text document
- **Conclusion**: Very efficient, no API transcription costs

## Implementation Plan <!-- markmap: fold -->
### Phase 1: Setup Tools
- [ ] Verify sox is installed (`brew install sox` on macOS)
- [ ] Install whisper.cpp or similar local transcription tool
- [ ] Test basic recording and transcription workflow

### Phase 2: Directory Structure
- [ ] Create `documents/audio/` directory for storage
- [ ] Define naming convention (e.g., `YYYY-MM-DD-topic-NNN.wav`)
- [ ] Create matching `.txt` files for transcripts

### Phase 3: Automation Script
- [ ] Create helper script: `documents/meta/scripts/voice-note.sh`
- [ ] Script handles: record → transcribe → store
- [ ] Add metadata (date, duration, topic tags)
- [ ] Optionally prompt for topic/title after recording

### Phase 4: Integration
- [ ] Add voice notes to relevant views (by-topic, by-project, by-date)
- [ ] Document workflow in meta documentation
- [ ] Test end-to-end workflow

## File Organization <!-- markmap: fold -->
### Proposed Structure
```
documents/
├── audio/
│   ├── 2025-11-05-idea-001.wav
│   ├── 2025-11-05-idea-001.txt
│   ├── 2025-11-05-meeting-notes.wav
│   └── 2025-11-05-meeting-notes.txt
└── meta/
    └── scripts/
        └── voice-note.sh
```

### Naming Convention
- Format: `YYYY-MM-DD-topic-NNN.{wav,txt}`
- Date prefix for chronological sorting
- Topic slug for quick identification
- Sequential number for multiple notes per day/topic

## Helper Script Design <!-- markmap: fold -->
### Basic Functionality
```bash
#!/bin/bash
# voice-note.sh - Record and transcribe voice notes

# Prompt for topic
read -p "Topic/title: " topic
timestamp=$(date +%Y-%m-%d-%H%M%S)
basename="${timestamp}-${topic}"

# Record audio
echo "Recording... (Ctrl+C to stop)"
sox -d "documents/audio/${basename}.wav"

# Transcribe
echo "Transcribing..."
whisper.cpp "documents/audio/${basename}.wav" > "documents/audio/${basename}.txt"

echo "Saved: documents/audio/${basename}.{wav,txt}"
```

### Enhanced Features
- Pre/post recording hooks
- Automatic view updates (append to by-date view)
- Duration tracking
- Quality settings for sox
- Model selection for whisper

## Tools & Dependencies <!-- markmap: fold -->
### Required
- **sox**: Audio recording utility
  - macOS: `brew install sox`
  - Linux: `apt-get install sox` or similar
- **whisper.cpp**: Local speech-to-text
  - GitHub: https://github.com/ggerganov/whisper.cpp
  - Fast, runs on CPU, multiple model sizes

### Optional
- **ffmpeg**: Audio format conversion if needed
- **jq**: For metadata in JSON format
- **fzf**: For fuzzy-finding past voice notes

## Future Enhancements <!-- markmap: fold -->
### Possible Features
- Speaker diarization (multiple speakers)
- Automatic summarization of transcripts
- Search across all transcripts
- By-date view with audio entries
- Integration with daily notes
- Markdown formatting of transcripts (paragraphs, headers)
- Timestamp markers in transcript

### Alternative Tools
- **OpenAI Whisper API**: Cloud-based, costs tokens but more accurate
- **Alternative recorders**: arecord, ffmpeg
- **Other STT engines**: Vosk, DeepSpeech

## Research & References <!-- markmap: fold -->
### Whisper.cpp
- Lightweight C++ implementation of OpenAI Whisper
- Runs on CPU, no GPU required
- Multiple model sizes (tiny, base, small, medium, large)
- Fast inference, suitable for real-time transcription

### Sox Usage
- Basic recording: `sox -d output.wav`
- With duration limit: `sox -d output.wav trim 0 300` (5 minutes)
- With silence detection: `sox -d output.wav silence 1 0.1 1% 1 2.0 1%`

## Questions & Decisions <!-- markmap: fold -->
### To Decide
- Which whisper model size? (base is good balance)
- Should script auto-add to views, or manual?
- Store all audio or just transcripts after some time?
- Compress/archive old audio files?

## Status <!-- markmap: fold -->
- **Current phase**: Planning & documentation
- **Next steps**: Verify tool availability, test basic workflow
- **Blockers**: None currently

## Notes <!-- markmap: fold -->
- This is the first project documented in the knowledge base
- Serves as template for future project documentation
- Using this to test the by-project view functionality
