<?php /** @var \Kirby\Cms\Block $block */ ?>
<?php /** @var int|null $chapterNumber */ ?>

<hgroup id="<?= str::slug($block->text()) ?>" class="scroll-section">
  <?php if ($block->level() == 'h1' && isset($chapterNumber)): ?>
	<span class="small-caps">Chapter <?= $chapterNumber ?></span>
  <?php endif ?>
  <<?= $level = $block->level()->or('h2') ?>>
	<?= $block->text() ?>
  </<?= $level ?>>
</hgroup>