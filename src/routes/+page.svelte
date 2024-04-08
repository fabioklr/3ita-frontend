<script lang="ts">
import { messages, landing } from "$lib";
import { flip } from "svelte/animate";
import Sparkles from "$lib/components/ui/Sparkles/Sparkles.svelte";
</script>

<div class="h-4/6">
    {#if $messages.length === 0 || $landing }
    <div class="flex items-center justify-center h-1/2">
        <div class="flex flex-col items-center">
            <h1 class="text-center text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary p-2">
                AI that identifies, innovates and implements</h1>
            <p class="text-lg text-center">Interact with a custom LangChain Agent that has access to a suite of tools including internal references.</p>
        </div>
    </div>

    <Sparkles
        class="w-full h-full"
        particleDensity={400}
        particleColor="blue"
        minSize={0.6}
        maxSize={1.5}
        speed={3} />

    {/if}

    {#if $messages.length > 0 && !$landing }
    <div class="overflow-auto">
    {#each $messages as message, index (index)}
        <div class="chat {message.sender === 'ai' ? 'chat-start' : 'chat-end'}" animate:flip={{ duration: 200 }}>
            <div class="chat-header">
                { message.sender === 'ai' ? 'AI' : 'You' }
                <time class="text-xs opacity-50">{new Date().toLocaleTimeString()}</time>
            </div>
            <div class="chat-bubble">{ message.content }</div>
        </div>
    {/each}
    </div>
    {/if}
</div>
