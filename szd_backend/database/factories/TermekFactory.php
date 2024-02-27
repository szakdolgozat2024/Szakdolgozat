<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Ramsey\Uuid\Type\Decimal;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\termek>
 */
class TermekFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ar' => random_int(10, 100000),
            'modell' => random_int(1, 10),
            'anyag' => fake()->word(),
            'szin' => fake()->colorName(),
            'keszlet' => random_int(10, 100)
        ];
    }
}
