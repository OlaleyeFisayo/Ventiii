PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_speaker` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`event_id` text NOT NULL,
	`name` text NOT NULL,
	`title` text,
	`company` text,
	`bio` text,
	`image` text NOT NULL,
	`social_links` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_speaker`("id", "event_id", "name", "title", "company", "bio", "image", "social_links", "created_at", "updated_at") SELECT "id", "event_id", "name", "title", "company", "bio", "image", "social_links", "created_at", "updated_at" FROM `speaker`;--> statement-breakpoint
DROP TABLE `speaker`;--> statement-breakpoint
ALTER TABLE `__new_speaker` RENAME TO `speaker`;--> statement-breakpoint
PRAGMA foreign_keys=ON;