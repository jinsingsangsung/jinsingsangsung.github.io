import type { AstroIntegration } from "astro";
import type { Block, RichText } from "@/lib/interfaces";
import { getAllEntries, getPostContentByPostId, downloadFile, generateFilePath } from "../lib/notion/client";
import { LAST_BUILD_TIME } from "../constants";
import fs from "fs";

// Extract custom emoji URLs from blocks
const extractCustomEmojiBlocks = (blocks: Block[]): { url: string; name: string }[] => {
	const emojis: { url: string; name: string }[] = [];
	
	const extractFromRichTexts = (richTexts: RichText[]) => {
		richTexts.forEach(richText => {
			if (richText.Mention?.CustomEmoji?.Url) {
				emojis.push({
					url: richText.Mention.CustomEmoji.Url,
					name: richText.Mention.CustomEmoji.Name
				});
			}
		});
	};

	const processBlock = (block: Block) => {
		// Extract from various block types that contain RichText
		if (block.Paragraph?.RichTexts) extractFromRichTexts(block.Paragraph.RichTexts);
		if (block.Heading1?.RichTexts) extractFromRichTexts(block.Heading1.RichTexts);
		if (block.Heading2?.RichTexts) extractFromRichTexts(block.Heading2.RichTexts);
		if (block.Heading3?.RichTexts) extractFromRichTexts(block.Heading3.RichTexts);
		if (block.BulletedListItem?.RichTexts) extractFromRichTexts(block.BulletedListItem.RichTexts);
		if (block.NumberedListItem?.RichTexts) extractFromRichTexts(block.NumberedListItem.RichTexts);
		if (block.ToDo?.RichTexts) extractFromRichTexts(block.ToDo.RichTexts);
		if (block.Quote?.RichTexts) extractFromRichTexts(block.Quote.RichTexts);
		if (block.Callout?.RichTexts) extractFromRichTexts(block.Callout.RichTexts);
		if (block.Toggle?.RichTexts) extractFromRichTexts(block.Toggle.RichTexts);
		
		// Process captions
		if (block.NImage?.Caption) extractFromRichTexts(block.NImage.Caption);
		if (block.Video?.Caption) extractFromRichTexts(block.Video.Caption);
		if (block.File?.Caption) extractFromRichTexts(block.File.Caption);
		if (block.Code?.Caption) extractFromRichTexts(block.Code.Caption);
		
		// Process table cells
		if (block.Table?.Rows) {
			block.Table.Rows.forEach(row => {
				row.Cells.forEach(cell => {
					extractFromRichTexts(cell.RichTexts);
				});
			});
		}
	};

	// Recursive processing for nested blocks
	const processBlockRecursively = (block: Block) => {
		processBlock(block);
		
		// Handle nested blocks
		if (block.ColumnList?.Columns) {
			block.ColumnList.Columns.forEach(column => {
				if (column.Children) emojis.push(...extractCustomEmojiBlocks(column.Children));
			});
		}
		if (block.BulletedListItem?.Children) emojis.push(...extractCustomEmojiBlocks(block.BulletedListItem.Children));
		if (block.NumberedListItem?.Children) emojis.push(...extractCustomEmojiBlocks(block.NumberedListItem.Children));
		if (block.ToDo?.Children) emojis.push(...extractCustomEmojiBlocks(block.ToDo.Children));
		if (block.Paragraph?.Children) emojis.push(...extractCustomEmojiBlocks(block.Paragraph.Children));
		if (block.Heading1?.Children) emojis.push(...extractCustomEmojiBlocks(block.Heading1.Children));
		if (block.Heading2?.Children) emojis.push(...extractCustomEmojiBlocks(block.Heading2.Children));
		if (block.Heading3?.Children) emojis.push(...extractCustomEmojiBlocks(block.Heading3.Children));
		if (block.Quote?.Children) emojis.push(...extractCustomEmojiBlocks(block.Quote.Children));
		if (block.Callout?.Children) emojis.push(...extractCustomEmojiBlocks(block.Callout.Children));
		if (block.Toggle?.Children) emojis.push(...extractCustomEmojiBlocks(block.Toggle.Children));
	};

	blocks.forEach(processBlockRecursively);
	return emojis;
};

export default (): AstroIntegration => ({
	name: "custom-emoji-downloader",
	hooks: {
		"astro:build:start": async () => {
			console.log("Starting custom emoji download...");
			
			try {
				const allEntries = await getAllEntries();
				const emojiUrls = new Set<string>();
				
				// Collect all custom emoji URLs from all posts
				for (const entry of allEntries) {
					try {
						const { blocks } = await getPostContentByPostId(entry);
						const emojis = extractCustomEmojiBlocks(blocks);
						emojis.forEach(emoji => emojiUrls.add(emoji.url));
					} catch (e) {
						console.log(`Error processing entry ${entry.PageId}:`, e);
					}
				}
				
				console.log(`Found ${emojiUrls.size} unique custom emojis`);
				
				// Download all unique emojis that need updating
				let downloadedCount = 0;
				await Promise.all(
					Array.from(emojiUrls).map(async (url) => {
						try {
							const urlObj = new URL(url);
							const cacheFilePath = generateFilePath(urlObj);
							
							// Check if we need to download (same logic as other files)
							const shouldDownload = LAST_BUILD_TIME 
								? !fs.existsSync(cacheFilePath)
								: true;
							
							if (shouldDownload) {
								await downloadFile(urlObj, false, false); // Don't optimize or treat as favicon
								downloadedCount++;
							}
						} catch (e) {
							console.log('Error downloading emoji:', url, e);
						}
					})
				);
				
				console.log(`Downloaded ${downloadedCount} custom emojis`);
			} catch (e) {
				console.log('Error in custom emoji downloader:', e);
			}
		},
	},
});