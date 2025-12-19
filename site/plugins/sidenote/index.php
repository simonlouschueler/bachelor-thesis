<?php

require_once __DIR__ . '/ParsedownSidenote.php';

Kirby::plugin('simonlou/markdown-sidenote', [
  'components' => [
	'markdown' => function (Kirby\Cms\App $kirby, string|null $text = null, array $options = []): string {
	  $parser = new ParsedownSidenote();
	  
	  // Configure parser based on options
	  $parser->setBreaksEnabled($options['breaks'] ?? true);
	  $parser->setSafeMode($options['safe'] ?? false);
	  
	  if ($options['inline'] ?? false) {
		return $parser->line($text);
	  }
	  
	  return $parser->text($text);
	}
  ]
]);