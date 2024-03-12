<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\csomag>
 */
class CsomagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'csom_azon' => $this->faker->unique()->randomNumber(),
            'allapot' => $this->faker->numberBetween(0, 3)
        ];
    }
}
