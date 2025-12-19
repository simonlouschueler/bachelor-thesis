<?php

use Parsedown;

class ParsedownSidenote extends Parsedown
{
  public function __construct()
  {
	// Add sidenote to existing inline types
	$this->InlineTypes['^'] = ['Sidenote'];
	
	// Add '^' to the marker list
	$this->inlineMarkerList .= '^';
  }

  protected function inlineSidenote($Excerpt)
  {
	// Match ^[sidenote text] pattern
	if (
	  preg_match('/^\^\[([^\]]+)\]/', $Excerpt['text'], $matches)
	) {
	  $sidenoteText = $matches[1];
	  $extent = strlen($matches[0]);
	  
	  // Try to find the preceding word in the context
	  $context = $Excerpt['context'] ?? '';
	  $excerptStart = strlen($context) - strlen($Excerpt['text']);
	  
	  // Look backwards from the ^ marker to find the preceding word
	  $beforeMarker = substr($context, 0, $excerptStart);
	  $word = '';
	  
	  if (preg_match('/(\S+)\s*$/', $beforeMarker, $wordMatches)) {
		$word = $wordMatches[1];
		$extent += strlen($word); // Include the word in the extent
		
		return [
		  'extent' => $extent,
		  'position' => $excerptStart - strlen($word),
		  'element' => [
			'name' => 'span',
			'attributes' => [
			  'class' => 'sidenote-anchor'
			],
			'elements' => [
			  [
				'text' => $word
			  ],
			  [
				'name' => 'span',
				'attributes' => [
				  'class' => 'sidenote'
				],
				'text' => $sidenoteText
			  ]
			]
		  ]
		];
	  } else {
		// No word before, just return the sidenote
		return [
		  'extent' => $extent,
		  'element' => [
			'name' => 'span',
			'attributes' => [
			  'class' => 'sidenote'
			],
			'text' => $sidenoteText
		  ]
		];
	  }
	}
  }
}