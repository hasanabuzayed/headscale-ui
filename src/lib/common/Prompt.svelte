<!-- Shell-prompt page header. Only the catppuccin-mocha theme shows it (see app.css). -->
<script lang="ts">
	export let path = '';
	export let icon = '';
</script>

<div class="prompt" aria-hidden="true">
	<span class="seg seg-path"><span class="seg-icon">{icon}</span>{path}</span>
	<span class="seg seg-info"><slot /></span>
	<span class="prompt-cursor" />
</div>
