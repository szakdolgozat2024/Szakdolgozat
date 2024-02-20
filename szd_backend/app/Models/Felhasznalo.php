<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Felhasznalo extends Model
{
    use HasFactory;

    protected $fillable = [
        'nev',
        'jelszo',
        'hozzaferes',
        'email',
        'cim'
    ];
    
    protected $hidden = [
        'jelszo'
    ];

    
}
