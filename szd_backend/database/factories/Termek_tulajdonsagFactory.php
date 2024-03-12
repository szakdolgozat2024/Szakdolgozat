<?php

namespace Database\Factories;

use App\Models\Termek;
use App\Models\Tulajdonsag;
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
            'termek' => function () {
                return Termek::factory()->create()->id;
            },
            'tulajdonsag' => function () {
                return Tulajdonsag::factory()->create()->id;
            },
            'ertek' => $this->faker->word,
        ];
    }
}
