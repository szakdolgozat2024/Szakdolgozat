<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\felhasznalo>
 */
class FelhasznaloFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nev' => fake()->name(),
            'jelszo' => static::$password ??= Hash::make('jelszo'),
            'email' => fake()->unique()->safeEmail(),
            'cim' => fake()->address()
        ];
    }
}
