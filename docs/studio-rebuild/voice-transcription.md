# Voice transcription: activation, cost, and recovery

## Member experience

Open the chat’s attachment tools, record a voice note or attach supported audio, then review playback and its credit price. Transcription costs **2 credits per started minute**: 0:01–1:00 costs 2; 1:01–2:00 costs 4; the five-minute maximum costs 10. No credits are used to record, listen, discard, or download the recording. Stopping the microphone opens review; it does not automatically contact AI. The transcript enters the composer for review before sending a separate, normally metered Pal message.

Studio captures a complete 16 kHz, mono, 16-bit PCM WAV. Supported uploaded audio is converted locally by the browser to the same format; decoding support depends on the browser. Source uploads are limited to 25 MB and recordings to five minutes. Unsupported files produce a clear error. The microphone stops at the actual captured-frame limit, including in a background tab. There is no silent audio truncation or series of hidden paid chunks.

A failed attempt keeps the audio and its request identifier for an explicit retry. “Save recording” downloads a local backup. Pending audio lives in the open page; refreshing or leaving the conversation clears it, so download it first if needed. Saved recordings/transcripts use the existing private `campaign-assets` storage and workspace attachment records.

## Provider and economics

The adapter uses OpenAI’s documented **`gpt-transcribe`** model at a fixed **$0.0045 per audio minute**, via `https://api.openai.com/v1/audio/transcriptions`. This is a direct OpenAI integration; the current Lovable transcription catalog does not document that model route. The fixed duration price makes the maximum calculable before sending audio. Sources: [OpenAI model and pricing](https://developers.openai.com/api/docs/models/gpt-transcribe), [speech-to-text API guide](https://developers.openai.com/api/docs/guides/speech-to-text), [Lovable AI models](https://docs.lovable.dev/features/ai). Verified September 28, 2026; recheck pricing before activation or model changes.

| Recording            | Customer credits | Raw provider estimate | Budget estimate, including 25% reserve |
| -------------------- | ---------------: | --------------------: | -------------------------------------: |
| 30 seconds           |                2 |              $0.00225 |                             $0.0028125 |
| 60 seconds           |                2 |              $0.00450 |                              $0.005625 |
| 61 seconds           |                4 |             $0.004575 |                            $0.00571875 |
| 5 minutes            |               10 |              $0.02250 |                              $0.028125 |
| 100 one-minute notes |              200 |                 $0.45 |                                $0.5625 |

The reservation ceiling is $0.01 per started minute. The operator meter records validated duration and the actual duration-based estimate plus the same 25% contingency used by other AI tasks; these are estimates, not provider invoices. At the cheaper 1,500-credit/$50 top-up rate, 100 one-minute notes represent $6.67 of purchased usage versus $0.5625 reserved estimated AI expense, before payment fees, taxes, hosting, and support. The full bundle fee must be allocated rather than charging a hypothetical Stripe fee on each note. Included membership credits are a shared usage allowance, not separate revenue per transcription.

## Server safeguards

- Authenticate before reading the upload, cap streamed multipart bytes even without Content-Length, and validate workspace and conversation ownership before a paid call.
- Require a canonical WAV and calculate duration from validated sample counts. Browser-supplied duration, MIME, and filenames do not determine credits. Extra/forged chunks, altered sample rates, incomplete files, and trailing hidden data fail closed.
- Atomically reserve credits and global/workspace provider exposure. Missing membership, insufficient balance, expired access, debt, or budget exhaustion prevents the provider request.
- Use one fixed trusted endpoint, reject redirects, permit only the priced model, allow one provider call per reservation, cap responses, and time out after 120 seconds. No automatic provider retries or remote-media URLs.
- Bind a UUID request identifier to the user, workspace, conversation, and SHA-256 of the exact audio. Concurrent duplicates cannot invoke the provider. A completed retry reopens its saved transcript without charging again. Reusing the identifier with different audio or another conversation is rejected.
- Save the attachment and request completion in one PostgreSQL transaction. Provider/storage failure releases customer credits once; incurred provider costs remain counted. A confirmed conversation deletion also rolls back and releases credits. An uncertain save or failed credit-release write preserves the reservation for reconciliation rather than risking a free saved result or duplicate paid call.
- Capability checks expose only availability and a human-readable reason. Provider keys, internal costs, request hashes, and service credentials remain server-only.

## Activation checklist

1. Apply `20260928030000_studio_voice_usage.sql` after the existing credit-ledger migration. It adds the `transcription` operation and service-only request RPCs/table. No new customer billing prices or automatic charges are needed.
2. Configure `STUDIO_TRANSCRIPTION_API_KEY` in the deployment secret manager (or existing `OPENAI_API_KEY`) and, optionally, `STUDIO_TRANSCRIPTION_MODEL=gpt-transcribe`. An unpriced replacement fails closed. Keep `STUDIO_TRANSCRIPTION_ENABLED` unset until ready for controlled verification; set it to `true` on the test deployment to run the checks below. A Lovable key alone does not enable this feature.
3. Confirm Supabase service credentials, private storage, the existing credit ledger, and a deliberate `STUDIO_AI_MONTHLY_BUDGET_USD` are configured. Voice consumes the same global safety cap. The previous default is $100 across all workspaces.
4. In a controlled test workspace, make one live paid transcription and compare its text, actual provider billing, recorded duration, and credit change. Verify the deployment supports multipart uploads up to the canonical five-minute WAV size (9,600,044 bytes plus multipart overhead) and an invocation longer than the 120-second provider timeout. Provider/model availability has not been live-tested locally.
5. Test iOS Safari and Android Chrome microphone permission, stop/cancel, audio playback, a supported compressed upload, five-minute auto-stop, denial of microphone permission, and browser decode failures. Local browser tests use synthetic recordings, not real microphone hardware.
6. Replay the same request concurrently, retry after a dropped response, simulate provider/storage failures, and test empty balance/nonmember/foreign conversation before enabling voice for customers. Verify no automatic retries or credit debits before confirmation.
7. Enable the voice flag in production only after these checks. This does not change the separate `STUDIO_AI_SALES_READY` and top-up sales gates.

## Stuck requests / operator recovery

Use service access only. Investigate `studio_voice_requests.status='pending'` older than 15 minutes alongside its `usage_id`, `studio_credit_usage`, `conversation_attachments.metadata.usageReservationId`, private storage, and provider records. The request's immutable conversation ID preserves deletion evidence.

- If the request is completed and the attachment exists, finish its credit reservation as completed with the verified duration-based cost; a retry reopens the same attachment.
- If a save timed out but actually committed, the completed request and attachment share one transaction. Do not delete it or refund a successful output merely because the HTTP response was lost.
- If no saved output exists and work is definitively stopped, release credits once using `finish_studio_credits` while retaining incurred provider estimates, then use `fail_studio_voice` with that attempt token to permit an explicit retry. Clean up any verified orphan storage object separately.
- If a process crashed after binding but before recording provider usage, conservatively retain the reservation ceiling until provider records resolve the expense. Do not run a blind timed refund or auto-retry job.
- If the member removed the saved attachment, the completed request remains completed; it cannot be reused to silently start another paid transcription.

## Local evidence

The offline suite covers pricing boundaries, malformed durations, bounded uploads, trusted endpoint behavior, missing configuration, reservation/refund/cost recording, completed and parallel retries, deleted conversations, storage failures, uncertain persistence, and SQL permissions. The synthetic browser walkthrough covers mobile/desktop review, visible price, recording playback, stable-key retry, empty balance, discard, and disabled configuration. No live paid API request or database mutation was performed.
