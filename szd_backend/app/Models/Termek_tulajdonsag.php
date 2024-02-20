<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Termek_tulajdonsag extends Model
{
    use HasFactory;

    protected $fillable = [
        'termek',
        'tulajdonsag',
        'ertek'
    ];
}
