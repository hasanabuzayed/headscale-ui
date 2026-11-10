<!-- Bottom status line. Only the catppuccin-mocha theme shows it (see app.css). -->
<script lang="ts">
	import { apiTestStore, URLStore, themeStore } from '$lib/common/stores.js';

	$: host = (() => {
		try {
			return new URL($URLStore).host;
		} catch {
			return '';
		}
	})();
	$: state = $apiTestStore === 'succeeded' ? 'ok' : $apiTestStore === 'failed' ? 'bad' : 'idle';
	$: label = state === 'ok' ? 'connected' : state === 'bad' ? 'unreachable' : 'idle';
</script>

<div class="statusbar" role="status">
	<span class="sb-seg sb-{state}">{label}</span>
	<span class="sb-host">{host || 'no server set'}</span>
	<span class="sb-theme">{$themeStore}</span>
</div>
