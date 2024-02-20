<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Csomag extends Model
{
    use HasFactory;

    protected $fillable = [
        "csom_azon", 
        "allapot",
    ];
}
