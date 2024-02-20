<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rend_tetel extends Model
{
    use HasFactory;

    protected $fillable = [
        "rendeles", 
        "termek",
        "mennyiseg"
    ];
}
