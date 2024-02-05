import { describe, it, expect } from 'vitest';
import parseDescription from '$/lib/parseDescription';

describe('parse description test', () => {
	it('parses time stamps into anchor tags', () => {
		expect(
			parseDescription(
				`
    1:23
    2:23:46
    12:34
    1:23:45
    00:00:00`,
				''
			)
		).toBe(`
    <a class="tabular-nums " href="?t=83">1:23</a>
    <a class="tabular-nums " href="?t=8626">2:23:46</a>
    <a class="tabular-nums " href="?t=754">12:34</a>
    <a class="tabular-nums " href="?t=5025">1:23:45</a>
    <a class="tabular-nums " href="?t=0">00:00:00</a>`);
	});

	it('parses time stamps with hours greater than 59', () => {
		expect(parseDescription(`100:48:48`, '')).toBe(
			`<a class="tabular-nums " href="?t=362928">100:48:48</a>`
		);
	});
});
