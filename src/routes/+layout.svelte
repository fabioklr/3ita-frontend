<script lang="ts">
import "../app.css";
import { RemoteRunnable } from "@langchain/core/runnables/remote";
import { HumanMessage } from "@langchain/core/messages";
import { messages, landing } from "$lib";
import logo from '$lib/assets/logo.png';

let input = '';

async function submitQuery() {
    landing.set(false);
    messages.addMessage({ sender: 'human', content: input });
    const graph = new RemoteRunnable({
      url: `https://langchain-backend.graystone-a06c4f4b.switzerlandnorth.azurecontainerapps.io`,
    });   
    const stream = await graph.stream([new HumanMessage({ content: input })]);
    messages.addMessage({ sender: 'ai', content: '' });
    let generalContent = '';
    let toolUsed = false;
    for await (const chunk of stream) {
        const [nodeName, output] = Object.entries(chunk)[0];
        if (nodeName === 'venkat' || nodeName === 'search') {
            toolUsed = true;
            messages.appendToMessage(output.content);
        } else if (nodeName === 'general') {
            generalContent = output.content;
        }
    }
    if (!toolUsed) {
        messages.appendToMessage(generalContent);
    };
};
</script>

<main class="container mx-auto h-svh relative">
    <nav class="navbar flex justify-between h-1/6">
        <div>
            <a on:click={() => landing.set(true)} class="btn btn-ghost text-xl">3i Transformation Agent</a>
        </div>
        <div>
            <a href="https://www.sieberpartners.com/" target="_blank">
                <img class="menu menu-horizontal max-h-20" src={logo} alt="Logo">
            </a>
        </div>
    </nav>

    <slot />

    <div class="absolute inset-x-0 bottom-0">
        <div class="flex space-x-2">
            <input on:keydown={(event) => {if (event.key === 'Enter') submitQuery();}} bind:value={input} name="human-message" type="text" class="border border-gray-300 rounded-lg p-2 flex-grow" placeholder="Type your message..." />
            {#if $messages.length > 0 && $landing}
                <button class="btn" on:click={ () => landing.set(false) }>Back to Chat</button>
            {/if}
            <button class="btn" on:click={ submitQuery }>Ask</button>
        </div>
        <footer class="footer footer-center p-2 text-base-content h-12">
            <aside>
              <p>Copyright © {new Date().getFullYear()} - All right reserved by Dr. Pascal Sieber & Partners AG</p>
            </aside>
        </footer>
    </div>
</main>