<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Termek extends Model
{
    use HasFactory;

    protected $fillable = [
        "leiras",
        "ar",
        "modell",
        "anyag",
        "szin",
        "keszlet"
    ];
}
