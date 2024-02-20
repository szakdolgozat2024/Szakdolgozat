<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\termek_tulajdonsag>
 */
class Termek_tulajdonsagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'termek' => random_int(1,10),
            'tulajdonsag' => random_int(1,10),
            'ertek' => fake()->word()
        ];
    }
}
