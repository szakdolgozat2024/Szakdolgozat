<?php

namespace Database\Factories;

use App\Models\Csomag;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\rendeles>
 */
class RendelesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user'=>1, 
        'kelt'=>fake()->dateTimeThisMonth(),
        'csomag' => function(){
            return Csomag::factory()->create()->id;
        }
        ];
    }
}
