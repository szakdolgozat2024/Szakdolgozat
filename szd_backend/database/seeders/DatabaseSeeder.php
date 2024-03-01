<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Modell;
use App\Models\Termek;
use App\Models\Termek_tulajdonsag;
use App\Models\Tulajdonsag;
use App\Models\Rendeles;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        Modell::factory(10)->create();
        Termek::factory(10)->create();
        Tulajdonsag::factory(10)->create();
        Termek_tulajdonsag::factory(10)->create();
        Rendeles::factory(10)->create();
    }
}
